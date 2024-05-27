const {create} = require('node-persist');

const storage = create();

const initialise = async () => { 
    await storage.init({
        dir: 'New Folder',
        ttl: 24 * 60 * 60 * 1000
    })
}

// const getData = async () => {
//     await initialise();
//     let res = await storage.setItem('2', '33222');
//     if(!res) console.log('error')
// }
// getData();

const clearAll = async () => {
    await initialise();
    await storage.clear();
}
clearAll();