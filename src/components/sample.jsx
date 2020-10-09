import React from "react";
import "./sample.css";
class Sample extends React.Component {
  constructor() {
    super();
    this.state = {
      length: 50,
      max: 100,
      update_speed: 100,
    };
    this.state.sample = this.createNewSample(this.state.length, this.state.max);
  }

  createNewSample(length, max) {
    const min = 5;
    return Array.from({ length: length }, () =>
      Math.floor(Math.random() * (max - min) + min)
    );
  }
  handleNewSample = (length, max) => {
    let sample = this.createNewSample(length, max);
    console.log(sample);
    this.setState({ sample });
  };

  compare(bar1, bar2, counter) {
    //color cues for comparing
    bar1.classList.add("compare");
    bar2.classList.add("compare");
  }

  swap(bar1, bar2) {
    let temp_value = bar1.dataset.value;
    let temp_height = bar1.style.height;
    bar1.dataset.value = bar2.dataset.value;
    bar2.dataset.value = temp_value;
    bar1.style.height = bar2.style.height;
    bar2.style.height = temp_height;
  }

  bubbleSort = () => {
    const update_speed = this.state.update_speed;
    let bars = document.getElementsByClassName("bar");
    let len = this.state.length;
    let counter = 1;
    for (let i = 1; i < len; i++) {
      for (let j = 0; j < len - i; j++) {
        const b1 = bars[j];
        const b2 = bars[j + 1];
        setTimeout(
          () => this.compare(b1, b2, counter),
          update_speed * counter++
        );
        setTimeout(() => {
          if (parseInt(b1.dataset.value) > parseInt(b2.dataset.value)) {
            this.swap(b1, b2);
            counter++;
          }
        }, update_speed * counter);

        setTimeout(() => {
          b1.classList.remove("compare");
          // b2.classList.remove('compare');
        }, update_speed * counter++);
      }
    }
  };

  insertionSort = () => {
    const update_speed = 30;
    let bars = document.getElementsByClassName("bar");
    let values = [...this.state.sample]
    let len = this.state.length;
    let counter = 1;
    for (let i = 1; i < len; i++) {
      for (let j = i - 1; j >= 0; j--) {
          if(values[j+1] < values[j]){
              const curr_bar = bars[j+1]
              const othr_bar = bars[j]
              setTimeout(() => {
                this.compare(curr_bar, othr_bar);
              }, update_speed * ++counter);
              let tmp = values[j+1]
              values[j+1] = values[j]
              values[j] = tmp
              setTimeout(() => {
                this.swap(curr_bar, othr_bar)
              }, update_speed * ++counter);
          }
      }
    }
  };

  handleSort = (type) => {
    switch (type) {
      case "bubble":
        this.bubbleSort();
        break;
      case "insertion":
        this.insertionSort();
        break;
    }
  };

  render() {
    return (
      <React.Fragment>
        <div className="graph">
          {this.state.sample.map((v, index) => (
            <div
              key={index}
              className="bar"
              style={{ height: v + "%", width: "1vh" }}
              data-value={v}
            ></div>
          ))}
        </div>
        <button
          onClick={() =>
            this.handleNewSample(this.state.length, this.state.max)
          }
        >
          New Sample
        </button>
        <button onClick={() => this.handleSort("bubble")}>Bubble Sort</button>
        <button onClick={() => this.handleSort("insertion")}>
          Insertion Sort
        </button>
      </React.Fragment>
    );
  }
}

export default Sample;
