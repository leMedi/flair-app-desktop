import SocketIO from 'socket.io'

const http = require('http');

const PORT = 546;

let server = null;
let  httpServer = null;

export default class seanceServer {
  // static server
  
  // static httpServer

  constructor(seance, _module, students) {
    if(httpServer)
      httpServer.close()

    server = null;
    httpServer = null;

    this.tasks = seance.tasks;
    this.tasks = seance.tasks.map(task => Object.assign({}, { title: task, isDone: false}));
    this.assignments = seance.assignments.map(assignment => Object.assign(assignment, {isDone: false}));

    this.seance = {
      _id: seance._id,
      name: seance.name,
      dateDebut: seance.dateDebut,
      dateFin: seance.dateFin,

      module: _module.name
    };

    this.students = students;

    this.isAcceptingNewConnections = false;
    this.connectedStudents = {};

    this._onStudent = ()=>null
    this._onStudentDisconnect = ()=>null
  }

  start(cb) {
    console.log('hello')
    httpServer = http.createServer()
    server = new SocketIO(httpServer)

    this.socketInit()
    this.acceptConnection()

    httpServer.listen(PORT)
    console.log('[!] Socket server is listening')

    cb()
  }

  stop(cb) {
    if(httpServer)
      httpServer.close(() => {
        seanceServer.server = null
        console.warn('[!] Socket stopped listening')
        cb()
      });
  }


  acceptConnection() { this.isAcceptingNewConnections = true }

  stopAcceptingConnection() { this.isAcceptingNewConnections = false }

  // events
  onStudent(cb) {this._onStudent = cb}
  
  onStudentDisconnect(cb) {this._onStudentDisconnect = cb}

  // handle Events
  socketInit() {
    server.on('connection', (socket) => {
      const currentStudent = {
        id: socket.id,
        cne: socket.handshake.query.cne,
        socket
      };


      if(this.connectedStudents[currentStudent.cne]) {
        // student already connected
        // kick him out
        console.warn('student already connected', currentStudent)
        socket.disconnect()
      } else if(this.isAcceptingNewConnections && this._studentGetByCNE(currentStudent.cne) > -1) {
        // we are accepting new connection
        // and student is allowed to connect
        console.log('new student', currentStudent)
        this.connectedStudents[currentStudent.cne] = currentStudent
        this.acceptStudent(socket)
        this._onStudent(currentStudent.cne)
        socket.on('disconnect', ()=>{
          this._onStudentDisconnect(currentStudent.cne)
          delete this.connectedStudents[currentStudent.cne]
          console.warn('student disconnected', currentStudent)
        })
      }else{
        // unknow student
        // do not accept connection
        socket.disconnect() 
        console.warn('unknow student', currentStudent)
      }

      

    })
  }

  _studentGetByCNE(cne) {
    for(let i=0; i < this.students.length; i++) {
      if(this.students[i].cne == cne)
        return i
    }
    return -1
  }

  acceptStudent(socket) {
    // send student seance info
    socket.emit('seance', this.seance)
    // send student assignments
    socket.emit('assignments', this.assignments)
    // send tasks
    socket.emit('tasks', this.tasks)

  }

  toggleTask(taskIndex, isDone) {
    this.tasks[taskIndex].isDone = isDone
    // send tasks to students
    server.sockets.emit('tasks', this.tasks)
  }


}

