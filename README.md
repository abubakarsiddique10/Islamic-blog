1. jodin array er modde multiple array take. tar modde koite object ace seta ber korte hole flat() method beboher korte hobe. flat multi dimentional array ke flat kore. one dimentional array create kore.

2. kono object er property name dia array create korte hole groupBy() method use kora hoy.

3. function deepFreeze(obj) {
    // akane akta forEach er loop sesh howar por Object.freeze() run hoy
    Object.keys(obj).forEach(key => {
        console.log(obj[key])
        if(typeof obj[key] === "object") {
            console.log('This is object')
            deepFreeze(obj[key]);
        }
    })
    console.log(obj)
    Object.freeze(obj)
}
const newObj = {
    title: "avenger",
    name: "abu",
    skill: {
        programming: "js",
        frontEnd: "html"
    },
    rating: "5 start",
    
};
deepFreeze(newObj);