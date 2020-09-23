const initialState = {
    users =[
        { id: 1, fullName: "Donald McDuck", location: { city: "Los Angeles", country: "USA" }, },
        { id: 2, fullName: "Alladin", location: { city: "Damask", country: "Syria" }, },
        { id: 3, fullName: "Alf", location: { city: "San Francisco", country: "USA" }, },
        { id: 4, fullName: "Spiderman", location: { city: "New York", country: "USA" }, },
    ]
};

const usersReducer = (state = initialState, action) => {
    switch(action.type) {
        default: return state;
    }
};

export default usersReducer;