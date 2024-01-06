const endpoints = {
    gg: 'AIzaSyDJ_sm-EFNvOBvTLMKbDi8CAT8G21GxDvQ',
    baseUrl: 'https://dashx-cc5d52b5155a.herokuapp.com',
    socketUrl: 'wss://expressryderv2.adaptable.app',
    login: '/dispatch/login',
    signUp: '/dispatch/signup',
    forgotPassword: '/dispatch/forgot/password',
    resetPassword: '/dispatch/reset/password',
    verify: '/dispatch/confirm/email',
    retriveProfile: '/dispatch/profile',
    updateProfile: '/dispatch/update/profile',
    updateVehicle: '/dispatch/update/vehicle',
    uploadPhoto: '/dispatch/update/photo',
    updateStatus: '/dispatch/update/status',
    listOdrders: '/dispatch/list/order',
    acceptOrders: '/dispatch/accept/order',
    myOrders: '/dispatch/myorder',
    verifyOrder: '/dispatch/pickup/order',
    city: '/dispatch/order/city',
    startDispatch: '/dispatch/start/dispatch',
    deliverOrder: '/dispatch/delivered/order',
    history: '/dispatch/order/history',

    //business
    addRider: '/bussiness/add/dispatch',
    retriveFleets: '/bussiness/retrieve/all/fleet',
    singleFleet: '/bussiness/retrieve/single/fleet',
    deliveryHistory: '/bussiness/delivery/history',
}

export default endpoints;