export function required(value) {
    return value !== null || "Field is required"
}

export function email(value){
    const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return pattern.test(value) || 'Not a valid email format'
}

export function minimum(value){
    return value.length>=8 || 'Must be 8 character or more'
}

// let rule={
//     req: value=>!!value||'req',
//     email:
// }
