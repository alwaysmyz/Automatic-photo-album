export default (api = {
    getUser: (name, password) => {
        // return fetch("http://127.0.0.1:8080/user/login", {
            return fetch("http://10.12.137.136" +
                ":8080/user/login", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: name,
                password: password
            })
        });
    },

    createUser: (name, password) => {
        console.log("in here");
        // return fetch("http://127.0.0.1:8080/user/regist", {
        //     return fetch("http://10.12.137.134:8080/user/regist", {
                return fetch("http://10.12.137.136:8080/user/regist", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: name,
                password: password
            })
        });
    },
    upload: (name, imagetotalnumber,imageclassifynumber,data) => {
        //     upload: (name, imagetotalnumber,imageclassifynumber) => {
        console.log(name,imagetotalnumber,imageclassifynumber)
        return fetch("http://10.12.137.136:8080/user/record", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: name,
                imagetotalnumber:imagetotalnumber,
                imageclassifynumber:imageclassifynumber,
                data:data,
            })
        });
    }

});