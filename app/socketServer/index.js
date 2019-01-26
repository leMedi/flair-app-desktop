import SocketIO from 'socket.io'

const http = require('http');
const express = require('express');
// const bonjour = require('bonjour')()

const PORT = 546;

let app = null
let socketServer = null;
let httpServer = null;

export default class seanceServer {
  // static server
  
  // static httpServer

  constructor({seance, _module, students, tasks}) {
    if(httpServer)
      httpServer.close()

    app = null;
    socketServer = null;
    httpServer = null;

    this.tasks = tasks;

    this.seance = {
      _id: seance._id,
      name: seance.name,
      moduleNom: _module.name
    };

    this.students = students;

    this.isAcceptingNewConnections = false;

    this._onStudent = ()=>null
    this._onStudents = ()=>null
    this._onStudentDisconnect = ()=>null
  }

  start(cb) {
    console.log('[!] Starting Http & Socket server ...')
    app = express()
    httpServer = http.Server(app)
    socketServer = new SocketIO(httpServer)

    this.socketInit()
    this.acceptConnection()


    app.get('/seance', (req, res) => {
      res.json({
        success:  true,
        seance: {
          ...this.seance,
          isLive: true,
        }
      });   
    })

    httpServer.listen(PORT)
    console.log('[!] Socket server is listening')

    // publish service
    // bonjour.publish({
    //   name: 'FLAIR_SEANCE_SERVER',
    //   port: PORT,
    //   type: 'http',
    // })

    cb()
  }

  // eslint-disable-next-line class-methods-use-this
  stop(cb) {
    console.log('[!] stopping dffdfd', httpServer)
    if(httpServer){
      console.log('[!] stopping hello hello')
      httpServer.close(() => {
        app = null
        httpServer = null
        socketServer = null
        // bonjour.unpublishAll()
        console.log('[!] Socket stopped listening')
        cb()
      });
    }
      
  }


  acceptConnection() { this.isAcceptingNewConnections = true }

  stopAcceptingConnection() { this.isAcceptingNewConnections = false }

  // events
  onStudent(cb) {this._onStudent = cb}
  
  onStudents(cb) {this._onStudents = cb}
  
  onStudentDisconnect(cb) {this._onStudentDisconnect = cb}

  // handle Events
  socketInit() {
    socketServer.on('connection', (socket) => {
      const { 
        // id, // use this as a unique id
        handshake: { query: { cne } } 
      } = socket


      console.warn('new connection', cne)

      const studentIndex = this._getStudentByCNE(cne)

      if(studentIndex >= 0) {
        const student = this.students[studentIndex]
        
        if(student.isConnected) {
          // student already connected
          // kick him out
          console.warn('[+] Student already connected', student)
          socket.disconnect()
        }else if(this.isAcceptingNewConnections) {
          // we are accepting new connection
          // and student is allowed to connect
          console.log('[+] New student connected', student.cne)

          this.students[studentIndex].socket = socket
          
          this.acceptStudent(this.students[studentIndex])
          this._onStudent(studentIndex)

          socket.on('disconnect', ()=>{
            this._onStudentDisconnect(studentIndex)
            this.students[studentIndex].socket = null
            console.warn('[!] student disconnected', this.students[studentIndex])
          })
          
          socket.on('assignmentToggle', (data)=>{
            const { index } = data;
            this.students[studentIndex].assignments[index].isDone = !this.students[studentIndex].assignments[index].isDone
            socket.emit('assignments', this.students[studentIndex].assignments) 
            this._onStudents(this.students)
          })
        }
      
      } else {
        // unknow student
        // do not accept connection
        socket.disconnect() 
        console.warn('[!] Unknow student (Blocked)', { cne })
      }

    })
  }

  _getStudentByCNE(cne) {
    for(let i=0; i < this.students.length; i+=1) {
      if(this.students[i].cne === cne)
        return i
    }
    return -1
  }

  acceptStudent(student) {
    // send student seance info
    student.socket.emit('seance', this.seance)
    // send tasks
    student.socket.emit('tasks', this.tasks)
    // send student assignments
    student.socket.emit('assignments', student.assignments)
  }

  setTasks(tasks) {
    this.tasks = tasks
    // send tasks to students
    socketServer.sockets.emit('tasks', this.tasks)
  }


}

