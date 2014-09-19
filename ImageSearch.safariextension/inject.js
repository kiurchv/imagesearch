document.addEventListener("contextmenu", handleContextMenu, false);

function handleContextMenu(event) {
  var target = {
    nodeName: event.target.nodeName,
    src: event.target.src
  };

  safari.self.tab.setContextMenuEventUserInfo(event, target);
}
