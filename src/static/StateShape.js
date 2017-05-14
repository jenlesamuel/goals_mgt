
const stateShape = {
    user:{
        isAuthenticated: false,
        fullname: null,
        token: null,
    },

    procrastination :{
        answers: null
    },
    
    sidebarVisible:false,

    goals:{
        dashboard:{
            isFetching: false,
            items: null,
            statusText:null
        },
         paged:{
            isFetching: true,
            data: null,
            statusText:null
        },
        lone:{
            isFetching: false,
            item: null,
            statusText: null
        }
    },
    tasks:{
        multiple: {
            items: null,
            isFetching: false,
            statusText: null,
        }
    },

    wheel:{
        isFetching: false,
        item: null,
        errorText: null
    }
}

// MY PALETTE
//base: #30C9E8
//ACCENT1 (red):#FF4431
//(white): #FFF
//dark grey: #3B4A4D
// light grey: #F7F8FA