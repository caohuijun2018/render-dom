const data = [
  {
    id: "node1",
    type: "div",
    className: "section1",
    children: [
      {
        id: "node2",
        type: "div",
        className: "text",
        children: [
          {
            id: "node3",
            type: "span",
            content: "说明文字",
            onClick: () => {
              console.log(123);
            },
          },
          {
            id: "node4",
            type: "i",
            className: "icon-font-example",
          },
        ],
      },
    ],
  },
  {
    id: "node5",
    type: "div",
    className: "section1",
    children: [
      {
        id: "node6",
        type: "input",
        className: "custom-input",
      },
    ],
  },
];

type virtualDomElement = {
  id: string;
  type: string;
  className?: string;
  content?: string;
  onClick?: any;
  children?: Array<virtualDomElement>;
};

function renderDom(
  element: virtualDomElement | Array<virtualDomElement>,
  container: HTMLElement
): void {
  if (!Array.isArray(element)) {
    renderDom([element], container);
    return;
  }
  //JSON转DOM
  for (let el of element) {
    let node = document.createElement(el.type);
    node.id = el.id;
    if (el.className) {
      node.className = el.className;
    }
    if (el.content) {
      node.textContent = el.content;
    }
    if (el.onClick) {
      node.onclick = el.onClick;
    }
    if (el.children) {
      renderDom(el.children, node);
    }
    container.append(node);
  }
}

//移动节点
function moveNode(tree: HTMLElement, source: string, target: string) {
  let sourNode = tree.querySelector("#" + source);
  let tarNode = tree.querySelector("#" + target);
  if (sourNode && tarNode) {
    let parent = sourNode.parentElement;
    if (parent) {
      parent.removeChild(sourNode);
      tarNode.appendChild(sourNode);
    }
  }
  return tree;
}

const sleep = (ms: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
};

export async function main() {
  const root = document.getElementById("root");
  if (!root) {
    throw Error("root not found");
  }
  renderDom(data, root);
  await sleep(1000);
  moveNode(root, "node3", "node5");
}

main();
