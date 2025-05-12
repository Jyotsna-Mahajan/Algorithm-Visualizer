"use strict";

class Helper {
    constructor(time, list = []) {
        // Ensure the time is never zero or negative
        this.time = Math.max(1, parseInt(400 / time)); // Prevent zero or negative time
        this.list = list;
    }

    // Highlight a single element as 'current'
    mark = async (index) => {
        this.list[index].setAttribute("class", "cell current");
    }

    // Mark an element as the minimum in selection sort
    markSpl = async (index) => {
        this.list[index].setAttribute("class", "cell min");
    }

    // Unmark the element (reset to normal state)
    unmark = async (index) => {
        this.list[index].setAttribute("class", "cell");
    }
    
    // Pause the execution for the set time
    pause = async () => {
        return new Promise(resolve => setTimeout(resolve, this.time));
    }

    // Compare two elements (returns true if the first is greater)
    compare = async (index1, index2) => {
        await this.pause();
        const value1 = Number(this.list[index1].getAttribute("value"));
        const value2 = Number(this.list[index2].getAttribute("value"));
        return value1 > value2;
    }

    // Swap the values of two elements and update their height accordingly
    swap = async (index1, index2) => {
        await this.pause();
        let value1 = this.list[index1].getAttribute("value");
        let value2 = this.list[index2].getAttribute("value");
      
        this.list[index1].setAttribute("value", value2);
        this.list[index1].style.height = `${3.8 * value2}px`;
        this.list[index1].textContent = value2; // ✅ Update visible number
      
        this.list[index2].setAttribute("value", value1);
        this.list[index2].style.height = `${3.8 * value1}px`;
        this.list[index2].textContent = value1; // ✅ Update visible number
      }
      
}
