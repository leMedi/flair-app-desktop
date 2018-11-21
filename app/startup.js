import Prof from './models/Prof' 

// sync db
export async function syncDB() {

}

// check if db has admin
export async function createDefaultAdmin() {
  // check if there is an admin
  const admins = await Prof.find({ role: 'admin' })

  if(admins.length === 0) {
    const admin = new Prof({
      firstName: 'Admin',
      lastName: 'Prof',
      phone: '0123456789',

      email: 'admin@ensa.com',
      password: 'admin123456',

      role: 'admin'
    })

    await admin.save()

    return admin
  }

  return 'Admin exists'
}


export default function startup() {
  createDefaultAdmin()
    .then(a => console.log('[+] createDefaultAdmin', a))
    .catch(err => console.error('[!] createDefaultAdmin Error:', err))
} 