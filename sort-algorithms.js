"use strict";

class sortAlgorithms {
    constructor(time) {
        this.time = time;
        this.list = document.querySelectorAll(".cell");
        this.size = this.list.length;
        this.help = new Helper(this.time, this.list);
    }

    BubbleSort = async () => {
        for (let i = 0; i < this.size - 1; i++) {
            for (let j = 0; j < this.size - i - 1; j++) {
                await this.help.mark(j);
                await this.help.mark(j + 1);
                if (await this.help.compare(j, j + 1)) {
                    await this.help.swap(j, j + 1);
                }
                await this.help.unmark(j);
                await this.help.unmark(j + 1);
            }
        }
    }

    SelectionSort = async () => {
        for (let i = 0; i < this.size; i++) {
            let minIndex = i;
            await this.help.markSpl(minIndex);
            for (let j = i + 1; j < this.size; j++) {
                await this.help.mark(j);
                if (await this.help.compare(minIndex, j)) {
                    await this.help.unmark(minIndex);
                    minIndex = j;
                    await this.help.markSpl(minIndex);
                } else {
                    await this.help.unmark(j);
                }
            }
            if (i !== minIndex) {
                await this.help.swap(i, minIndex);
            }
            await this.help.unmark(minIndex);
        }
    }

    InsertionSort = async () => {
        for (let i = 1; i < this.size; i++) {
            let j = i;
            while (j > 0 && await this.help.compare(j - 1, j)) {
                await this.help.mark(j);
                await this.help.mark(j - 1);
                await this.help.swap(j, j - 1);
                await this.help.unmark(j);
                await this.help.unmark(j - 1);
                j--;
            }
        }
    }

    MergeSort = async () => {
        const values = Array.from(this.list).map(el => Number(el.getAttribute("value")));
        await this.mergeSortRecursive(values, 0, this.size - 1);
    }

    mergeSortRecursive = async (arr, left, right) => {
        if (left >= right) return;

        const mid = Math.floor((left + right) / 2);
        await this.mergeSortRecursive(arr, left, mid);
        await this.mergeSortRecursive(arr, mid + 1, right);
        await this.merge(arr, left, mid, right);
    }

    merge = async (arr, left, mid, right) => {
        const leftArr = arr.slice(left, mid + 1);
        const rightArr = arr.slice(mid + 1, right + 1);
        let i = 0, j = 0, k = left;

        while (i < leftArr.length && j < rightArr.length) {
            this.list[k].classList.add("current");
            await this.help.pause();

            if (leftArr[i] <= rightArr[j]) {
                arr[k] = leftArr[i];
                this.list[k].style.height = `${3.8 * leftArr[i]}px`;
                this.list[k].setAttribute("value", leftArr[i]);
                this.list[k].textContent = leftArr[i];
                i++;
            } else {
                arr[k] = rightArr[j];
                this.list[k].style.height = `${3.8 * rightArr[j]}px`;
                this.list[k].setAttribute("value", rightArr[j]);
                this.list[k].textContent = rightArr[j];
                j++;
            }

            this.list[k].classList.remove("current");
            k++;
        }

        while (i < leftArr.length) {
            this.list[k].classList.add("current");
            await this.help.pause();
            arr[k] = leftArr[i];
            this.list[k].style.height = `${3.8 * leftArr[i]}px`;
            this.list[k].setAttribute("value", leftArr[i]);
            this.list[k].textContent = leftArr[i];
            this.list[k].classList.remove("current");
            i++;
            k++;
        }

        while (j < rightArr.length) {
            this.list[k].classList.add("current");
            await this.help.pause();
            arr[k] = rightArr[j];
            this.list[k].style.height = `${3.8 * rightArr[j]}px`;
            this.list[k].setAttribute("value", rightArr[j]);
            this.list[k].textContent = rightArr[j];
            this.list[k].classList.remove("current");
            j++;
            k++;
        }
    }

    QuickSort = async () => {
        await this.quickSortHelper(0, this.size - 1);
    }

    quickSortHelper = async (low, high) => {
        if (low < high) {
            const pi = await this.partition(low, high);
            await this.quickSortHelper(low, pi - 1);
            await this.quickSortHelper(pi + 1, high);
        }
    }

    partition = async (low, high) => {
        const pivot = Number(this.list[high].getAttribute("value"));
        let i = low - 1;

        for (let j = low; j < high; j++) {
            await this.help.mark(j);
            if (Number(this.list[j].getAttribute("value")) < pivot) {
                i++;
                await this.help.swap(i, j);
            }
            await this.help.unmark(j);
        }
        await this.help.swap(i + 1, high);
        return i + 1;
    }
}
