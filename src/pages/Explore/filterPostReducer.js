
export const filterPostReducer = (state,action) => {
  switch (action.type) {
      case  "SORT_BY_DATE":
          return {...state,sortByDate:action.payload}

      case "SEARCH_BY_QUERY":
        return {...state,searchByQuery:action.payload}    
  
      default:
         return state;
  }
}


