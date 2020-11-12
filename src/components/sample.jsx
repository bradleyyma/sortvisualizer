import React from "react";
import "./sample.css";
import * as helper from "./helpers.jsx";

class Sample extends React.Component {
  constructor() {
    super();
    this.state = {
      length: 70,
      max: 100,
      update_speed: 10,
      sort_algo: "merge",
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
    this.setState({ sample });
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
        setTimeout(() => helper.compare(b1, b2), update_speed * counter);
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
      let end_bar = bars[len - i];
      setTimeout(() => {
        end_bar.classList.add("final");
      }, update_speed * counter);
    }
    return counter;
  };

  insertionSort = () => {
    const update_speed = this.state.update_speed;
    let bars = document.getElementsByClassName("bar");
    let values = [...this.state.sample];
    let len = this.state.length;
    let counter = 0;
    for (let i = 0; i < len; i++) {
      let j;
      for (j = i - 1; j >= 0; j--) {
        let curr_bar = bars[j + 1];
        if (values[j + 1] < values[j]) {
          let othr_bar = bars[j];
          setTimeout(() => {
            curr_bar.classList.add("selected");
          }, update_speed * ++counter);
          let tmp = values[j + 1];
          values[j + 1] = values[j];
          values[j] = tmp;
          setTimeout(() => {
            helper.swap(curr_bar, othr_bar);
          }, update_speed * ++counter);
        } else break;
      }
      let end_bar = bars[j + 1];
      setTimeout(() => {
        end_bar.classList.add("final");
      }, update_speed * counter);
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
      let merge_index = start


      while(l < end_left && r < end) {
        let barl = bars[l];
        let barr = bars[r];
        setTimeout(() => {
          helper.compare(barl, barr);
        }, update_speed * ++counter);
        if (values[l] <= values[r]) {
          l++;
          setTimeout(() => {
            barl.classList.remove("compare");
            barl.classList.add("final")
          }, update_speed * ++counter);
        } else {
          let r_value = values[r];
          let update_time = update_speed * ++counter;
          for (let i = r-1; i >= merge_index; i--) {
            values[i + 1] = values[i];
            setTimeout(() => {
              helper.swap(bars[i + 1], bars[i]);
            }, update_time);
        }
            let just_merged = bars[merge_index]
          setTimeout( () => {
              just_merged.classList.add("final")
          }, update_time)
          values[merge_index] = r_value;
          l++;
          end_left++;
          r++;

        }
        merge_index++;


      }
      setTimeout( () => {
          for (let i = start; i < end; i++){
              bars[i].classList = "bar"
          }
      }, update_speed * ++counter)
      return;
    }

    mergeSortHelper(0, this.state.length);
    return counter;
  };

  quickSort = () => {
    const update_speed = this.state.update_speed;
    let bars = document.getElementsByClassName("bar");
    let values = [...this.state.sample];
    let counter = 0;
    function partition(values, bars, start, end) {
      let pivot = values[end - 1];
      let pivot_bar = bars[end - 1];
      setTimeout(() => {
        pivot_bar.classList.add("selected");
      }, counter * update_speed);
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
          setTimeout(() => {
            bar1.classList.remove("compare");
            bar2.classList.remove("compare");
          }, update_speed * ++counter);
        } else {
          setTimeout(() => {
            bar1.classList.remove("compare");
          }, update_speed * ++counter);
        }
      }
      let tmp = values[end - 1];
      values[end - 1] = values[swap_index];
      values[swap_index] = tmp;

      let b2 = bars[swap_index];

      setTimeout(() => {
        helper.swap(pivot_bar, b2);
      }, ++counter * update_speed);

      setTimeout(() => {
        b2.classList.add("final");
      }, ++counter * update_speed);
      // (values, pivot, start, end)
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
          bar.classList.add("final");
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

  handleSort = () => {
    let btns = document.getElementsByClassName("menu-btn");
    let bars = document.getElementsByClassName("graph")[0].childNodes;
    const type = this.state.sort_algo;
    const sorted = [...this.state.sample].sort(function (a, b) {
      return a - b;
    });
    for (let i = 0; i < btns.length; i++) {
      btns[i].disabled = true;
      btns[i].classList.add("disabled");
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
        bar.classList = "pass bar";
      }
      setTimeout(() => {
        for (let bar of bars) {
          bar.classList = "bar";
        }
        for (let i = 0; i < btns.length; i++) {
          btns[i].disabled = false;
          btns[i].classList.remove("disabled");
        }
        this.setState({ sample: sorted });
      }, 1000);
    }, time_after);
  };

  handleSortChoice = (event) => {
    this.setState({
      sort_algo: event.target.value,
    });
  };

  handleSize = (event) => {
    const length = event.target.value;
    const a = 1600;
    const b = 0.94;
    this.setState(
      {
        length: length,
        sample: helper.createNewSample(length, this.state.max),
        update_speed: a * b ** length,
      },
    );
  };
  render() {
    return (
      <React.Fragment>
        <h1>Sorting Visualizer</h1>
        <div className="contain">
          <div className="graph">
            {this.state.sample.map((v, index) => (
              <div
                key={index}
                className="bar"
                style={{
                  height: v + "%",
                  width: 100 / this.state.length + "%",
                }}
                data-value={v}
                id={index}
              ></div>
            ))}
          </div>
          <div className="menu row">
            <div className="col-sm">
              <button
                className="sortbtn menu-btn"
                onClick={() =>
                  this.handleNewSample(this.state.length, this.state.max)
                }
              >
                New Sample
              </button>
            </div>
            <div className="col-sm">
              <p className="menu-text">Size/Speed: </p>
              <input
                type="range"
                min="5"
                max="100"
                value={this.state.length}
                onChange={this.handleSize}
                className=" slider graph-editing menu-btn"
              />
              <label htmlFor="algo" className="menu-text">
                Sorting Algorithm:{" "}
              </label>
              <br />
              <select
                name="algo"
                className="menu-btn graph-editing"
                onChange={this.handleSortChoice}
                defaultValue = "merge"
              >
                <option value="bubble">Bubble</option>
                <option value="insertion">Insertion</option>
                <option value="merge">
                  Merge
                </option>
                <option value="quick">Quick</option>
              </select>
            </div>
            <div className="col-sm">
              <button
                className="sortbtn menu-btn"
                onClick={() => this.handleSort()}
              >
                Sort!
              </button>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Sample;
