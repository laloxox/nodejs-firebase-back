const {Router} = require('express');

const {db} = require('../firebase');

const router = Router();

router.get('/contacts', async (req, res) => {

    
    const querySnapshot = await db.collection('contacts').get()
    
    const contacts = querySnapshot.docs.map(doc => ({
        id: doc.id,

        //Forma mas corta de recorrer los objetos
        ...doc.data()
        
        
        //firstname: doc.data().firstname,
        //lastname: doc.data().lastname,
        //email: doc.data().email,
        //phone: doc.data().phone,
        //status: doc.data().status

    }))

    console.log(contacts);

    res.send('HELLO')
});

router.post('/new-contact',  async (req, res) => {

    const {firstname, lastname, email, phone } = req.body
    await db.collection('contacts').add({
        firstname, 
        lastname,
        email,
        phone
    })

    res.send('new contact create')
})

module.exports = router;