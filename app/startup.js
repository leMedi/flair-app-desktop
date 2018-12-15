import Prof from './models/Prof' 
import DefaultAdmin from './constants/admin.default.json'

// sync db
export async function syncDB() {

}

// check if db has admin
export async function createDefaultAdmin() {
  // check if there is an admin
  const admins = await Prof.find({ role: 'admin' })

  if(admins.length === 0) {
    const admin = new Prof(DefaultAdmin)

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