import { elements } from "../variables";

export const popup = async (url, js) => {
  // console.log(`../${js}`);

  // let { callModal } = await import(`../${js}`);
  const xhr = new XMLHttpRequest();

  xhr.onload = () => {
    if (xhr.status === 200) {
      console.log(xhr.responseText);
      elements.theModal.insertAdjacentHTML(`afterbegin`, xhr.responseText);
      elements.addModal();
      importJS(js);
    } else {
      console.log("not ok");
    }
  };

  xhr.open(`GET`, url);
  xhr.send();
};

const importJS = async (js) => {
  //   let path = `../${js}`;
  //   let callModal = await import(`` + path);
  let callModal = await import(`../modal.js`);
  console.log(callModal);
  callModal.callModal(state);
};
