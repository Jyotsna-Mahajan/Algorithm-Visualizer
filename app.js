"use strict";

const start = async () => {
  let algoValue = Number(document.querySelector(".algo-menu").value);
  let speedValue = Number(document.querySelector(".speed-menu").value);

  if (speedValue === 0) speedValue = 1;

  if (algoValue === 0) {
    alert("No Algorithm Selected");
    return;
  }

  let algorithm = new sortAlgorithms(speedValue);
  if (algoValue === 1) await algorithm.BubbleSort();
  if (algoValue === 2) await algorithm.SelectionSort();
  if (algoValue === 3) await algorithm.InsertionSort();
  if (algoValue === 4) await algorithm.MergeSort();
  if (algoValue === 5) await algorithm.QuickSort();
};

const RenderScreen = async () => {
  await RenderList();
};

const RenderList = async () => {
  await clearScreen();

  const input = document.getElementById("user-array").value.trim();  // ✅ This line was missing
  // if (!input) {
  //   alert("Please enter an array.");
  //   return;
  // }

  let list = input.split(/\s+/).map(Number);
  if (list.some(isNaN)) {
    alert("Invalid input. Please enter only numbers separated by spaces.");
    return;
  }

  const arrayNode = document.querySelector(".array");
  for (const element of list) {
  const node = document.createElement("div");
  node.className = "cell";
  node.setAttribute("value", String(element));
  node.style.height = `${3.8 * element}px`;
  node.textContent = element; // ✅ Shows number on the bar
  node.style.display = "flex";
  node.style.alignItems = "flex-end";
  node.style.justifyContent = "center";
  node.style.fontSize = "12px"; // You can adjust font size
  node.style.color = "#fff";    // Optional: make text white for contrast
  arrayNode.appendChild(node);
  }
};

const clearScreen = async () => {
  document.querySelector(".array").innerHTML = "";
};

const response = () => {
  let Navbar = document.querySelector(".navbar");
  if (Navbar.className === "navbar") {
    Navbar.className += " responsive";
  } else {
    Navbar.className = "navbar";
  }
};

// Event Listeners
document.querySelector(".icon").addEventListener("click", response);
document.querySelector(".start").addEventListener("click", async () => {
  await RenderList(); // Ensure array is rendered before sorting
  await start();
});
document.querySelector(".algo-menu").addEventListener("change", RenderScreen);
window.onload = RenderScreen;
