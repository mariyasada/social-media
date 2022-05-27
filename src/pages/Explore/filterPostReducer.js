import React from 'react'

export const filterPostReducer = (state,action) => {
  switch (action.type) {
      case  "SORT_BY_DATE":
          return {...state,sortByDate:action.payload}
  
      default:
         return state;
  }
}


