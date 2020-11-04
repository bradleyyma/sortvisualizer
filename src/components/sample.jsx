import React from "react";
import "./sample.css";
import * as helper from "./helpers.jsx";

class Sample extends React.Component {
  constructor() {
    super();
    this.state = {
      length: 100,
      max: 100,
      update_speed: 10,
    };
    const sample = helper.createNewSample(this.state.length, this.state.max);
    this.state.sample = sample;
    this.state.sorted = [...sample].sort(function (a, b) {
      return a - b;
    });
    // this.state.sample = [20, 95, 42, 45, 12];
  }

  handleNewSample = (length, max) => {
    let sample = helper.createNewSample(length, max);
    this.setState({
      sample: sample,
      sorted: [...sample].sort(function (a, b) {
        return a - b;
      }),
    });
  };
  bubbleSort = () => {
    const update_speed = this.state.update_speed;
    let bars = document.getElementsByClassName("bar");
    let values = [...this.state.sample];
    let len = this.state.length;
    let counter = 0;

    for (let i = 1; i < len; i++) {
      let flag = false;
      for (let j = 0; j < len - i; j++) {
        const b1 = bars[j];
        const b2 = bars[j + 1];
        setTimeout(() => helper.compare(b1, b2), update_speed * ++counter);
        if (values[j] > values[j + 1]) {
          flag = true;
          setTimeout(() => {
            helper.swap(b1, b2);
          }, update_speed * ++counter);
          let temp = values[j];
          values[j] = values[j + 1];
          values[j + 1] = temp;
        }
        setTimeout(() => {
          b1.classList.remove("compare");
          // b2.classList.remove('compare');
        }, update_speed * ++counter);
      }
      if (flag === false) {
        return counter;
      }
    }
    return counter;
  };

  insertionSort = () => {
    const update_speed = this.state.update_speed;
    let bars = document.getElementsByClassName("bar");
    let values = [...this.state.sample];
    let len = this.state.length;
    let counter = 0;
    for (let i = 1; i < len; i++) {
      for (let j = i - 1; j >= 0; j--) {
        if (values[j + 1] < values[j]) {
          let curr_bar = bars[j + 1];
          let othr_bar = bars[j];
          setTimeout(() => {
            helper.compare(curr_bar, othr_bar);
          }, update_speed * ++counter);
          let tmp = values[j + 1];
          values[j + 1] = values[j];
          values[j] = tmp;
          setTimeout(() => {
            helper.swap(curr_bar, othr_bar);
          }, update_speed * ++counter);
        }
      }
    }
    return counter;
  };

  mergeSort = () => {
    const update_speed = this.state.update_speed;
    let bars = document.getElementsByClassName("bar");
    let values = [...this.state.sample];
    let counter = 0;

    function mergeSortHelper(start, end) {
      // end is non-inclusive
      let length = end - start;
      if (length === 1) {
        return;
      }
      let half = start + Math.floor(length / 2);
      mergeSortHelper(start, half);
      mergeSortHelper(half, end);
      let l = start;
      let r = half;
      let end_left = half;
      let merge_index = start;
      while (l < end_left && r < end) {
        const barl = bars[l];
        const barr = bars[r];
        let height;
        setTimeout(() => {
          helper.compare(barl, barr);
          height = barr.style.height;
        }, update_speed * ++counter);

        setTimeout(() => {
          barl.classList.remove("compare");
          barr.classList.remove("compare");
        }, update_speed * ++counter);

        if (values[l] <= values[r]) {
          l++;
        } else {
          let r_value = values[r];
          let bar1 = bars[merge_index];
          // let height = barr.style.height
          let update_time = update_speed * ++counter;
          for (let i = r - 1; i >= merge_index; i--) {
            values[i + 1] = values[i];
            setTimeout(() => {
              bars[i + 1].style.height = bars[i].style.height;
            }, update_time);
            //html shift
          }

          setTimeout(() => {
            bar1.style.height = height;
          }, update_time);

          values[merge_index] = r_value;
          l++;
          end_left++;
          r++;
        }

        merge_index++;
      }
      return;
    }

    mergeSortHelper(0, this.state.length);
    console.log(values);
    return counter;
  };

  quickSort = () => {
    const update_speed = this.state.update_speed;
    let bars = document.getElementsByClassName("bar");
    let values = [...this.state.sample];
    let counter = 0;
    function partition(values, bars, start, end) {
      let pivot = values[end - 1];
      let swap_index = start;
      for (let j = start; j < end - 1; j++) {
        let bar1 = bars[j];
        let bar2 = bars[swap_index];
        setTimeout(() => {
          helper.compare(bar1, bar2);
        }, ++counter * update_speed);
        if (values[j] <= pivot) {
          let tmp = values[j];
          values[j] = values[swap_index];
          values[swap_index] = tmp;
          setTimeout(() => helper.swap(bar1, bar2), ++counter * update_speed);
          swap_index++;
        }
        setTimeout(() => {
          bar1.classList.remove("compare");
          bar2.classList.remove("compare");
        }, update_speed * ++counter);
      }
      let tmp = values[end - 1];
      values[end - 1] = values[swap_index];
      values[swap_index] = tmp;
      let b1 = bars[end - 1];
      let b2 = bars[swap_index];

      setTimeout(() => {
        helper.swap(b1, b2);
      }, ++counter * update_speed);
      setTimeout(() => {
        b2.classList.add("selected");
      }, counter * update_speed);
      // console.log(values, pivot, start, end)
      console.log(values);
      return swap_index;
    }
    function quickSortHelper(start, end) {
      let length = end - start;
      if (length === 0) {
        return;
      }
      if (length === 1) {
        let bar = bars[start];
        setTimeout(() => {
          bar.classList.add("selected");
        }, counter * update_speed);
        return;
      }
      let pivot = partition(values, bars, start, end);

      quickSortHelper(start, pivot);
      quickSortHelper(pivot + 1, end);
    }
    quickSortHelper(0, this.state.length);
    return counter;
  };

  handleSort = (type) => {
    let btns = document.getElementsByClassName("sortbtn");
    let bars = document.getElementsByClassName("bar");
    for (let i = 0; i < btns.length; i++) {
      btns[i].disabled = true;
    }
    var counter;
    switch (type) {
      case "bubble":
        counter = this.bubbleSort();
        break;
      case "insertion":
        counter = this.insertionSort();
        break;
      case "merge":
        counter = this.mergeSort();
        break;
      case "quick":
        counter = this.quickSort();
        break;
    }
    let time_after = counter * this.state.update_speed;
    setTimeout(() => {
      for (let bar of bars) {
        bar.classList.remove("compare");
        bar.classList.add("pass");
      }
      setTimeout(() => {
        for (let bar of bars) {
          bar.classList.remove("pass");
        }
        for (let i = 0; i < btns.length; i++) {
          btns[i].disabled = false;
        }
        this.setState({ sample: [...this.state.sorted] });
      }, 1000);
    }, time_after);
  };

  render() {
    return (
      <React.Fragment>
        <div className="graph">
          {this.state.sample.map((v, index) => (
            <div
              key={index}
              className="bar"
              style={{ height: v + "%", width: 100 / this.state.length + "%" }}
              data-value={v}
              id={index}
            ></div>
          ))}
        </div>
        <button
          className="sortbtn"
          onClick={() =>
            this.handleNewSample(this.state.length, this.state.max)
          }
        >
          New Sample
        </button>
        <button className="sortbtn" onClick={() => this.handleSort("bubble")}>
          Bubble Sort
        </button>
        <button
          className="sortbtn"
          onClick={() => this.handleSort("insertion")}
        >
          Insertion Sort
        </button>
        <button className="sortbtn" onClick={() => this.handleSort("merge")}>
          Merge Sort
        </button>
        <button className="sortbtn" onClick={() => this.handleSort("quick")}>
          Quick Sort
        </button>
      </React.Fragment>
    );
  }
}

export default Sample;
