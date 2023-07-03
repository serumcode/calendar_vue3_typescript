interface Event {
  id:number,
  title: string;
  start: string;
  end: string;
  interval: number;
  weekday: number;
}
const state = {
  items: [
   
    {
      id:2,
      title: "Páciens 2",
      start: "2023-06-01 10:00",
      end: "2023-08-01T12:00",
      interval:1,
      weekday:4,
    },
  {
      id:1,
      title: "Páciens 1",
      start: "2023-06-08 08:00",
      end: "2023-06-08 10:00:00",
      interval:0,
      weekday:1
    }, 
     {
      id:3,
      title: "Páciens 3",
      start: "2023-01-02 12:00",
      end: "2024-01-08 16:00",
      interval:2,
      weekday:1,
    },
    {
      id:4,
      title: "Páciens 4",
      start: "2023-01-01 10:00",
      end: "2023-01-01 16:00",
      interval:1,
      weekday:5,
    },
    {
      id:5,
      title: "Páciens 5",
      start: "2023-07-01 16:00",
      end: "2023-11-30 20:00",
      interval:1,
      weekday:4,
    },
  ] as Event[]
}
const getters ={
  eventItems:(state:any,getters:any)=>{
    return state.items
  }
}
const actions={
  addEvent({ commit }:any, event: Event) {
    commit('addEvent', event);
  },
  removeEvent({ commit }:any, event: Event) {
    commit('removeEvent', event);
  },
}
const mutations={
  addEvent(state:any, event: Event) {
    const idsArr=state.items.map((m:Event)=>m.id)
    const maxId=Math.max(...idsArr)
    event["id"]=maxId+1
    state.items.push(event)
  },
  removeEvent(state:any, event: Event) {
    state.items =state.items.filter((f:Event)=>f.id.toString()!==event.id.toString())
   // console.log("deleted event",event)
    state.items=state.items.concat([])
  },
}

export default {
 // namespaced:true,
  state,getters,actions,mutations
}
