export const getFilteredPost=(postList,state)=>{
    if(state.sortByDate==="Recent")
    {
        return postList.sort(
      (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
    );
    }
    else if(state.sortByDate==="Oldest")
    {
         return postList.sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );
    }
    else if(state.sortByDate==="Trending")
    {
        return postList.sort((a,b)=>a.likes.length - b.likes.length)
    }
    else return postList;
}