
export default class ChatBotSocket {
  constructor() {
    let socket_url = "/ws"; //same origin
    if (window.location.hostname == "localhost"){ 
      socket_url = "ws://localhost:8000/ws";
    }
    this.socket = new WebSocket(socket_url);
    this.routes = [];

  }

  add_socket_event(route,func){
    if (this.routes.includes(route)) return
    this.routes.push(route)
    this.socket.addEventListener(route,func)
  }
  // called when socket is connected to the server
  onConnect(func) {
    if (!this.socket) {
      func();
      return;
    }
    this.add_socket_event("open", () => {
      console.log("WebSocket connected");
      func();
    });
  }

  // called when the socket have to be disconnected from the server
  onDisconnect(func) {
    if (!this.socket) return;
    this.add_socket_event("close", (event) => {
      console.log("WebSocket closed with code:", event.code);
      func(event);
    });
  }

  onError(func) {
    if (!this.socket) return;

    this.add_socket_event("error", (error) => {
      console.error("WebSocket error:", error);
      func(error);
    });
  }

  // called when the client have to send the Event "getPrompt" to the server with the objective "objective"
  sendObjective(requestPayload) {
    if (!this.socket) return;
    requestPayload["route"] = "request-answer";
    this.socket.send(JSON.stringify(requestPayload));
    console.log("Client sent the objective via Socket: ", requestPayload);
  }

  onGetAnswer(func) {
    if (!this.socket) return;
    this.add_socket_event("message", (event) => {
      const data = JSON.parse(event.data);
      func(data);
    });
  }
}
