/**
 * Created by kamalkant on 31/07/17.
 */
import React from 'react';
import PropTypes from 'prop-types';

function clamp(n, min, max) {
  return Math.max(min, Math.min(max, n));
}

export class RadialProgress extends React.Component {

  constructor() {
    super();
    this.initialize = this.initialize.bind(this);
    this.generatePath = this.generatePath.bind(this);
    this.setInterval = this.setInterval.bind(this);
    this.state = { value: 0 };
  }

  componentDidMount() {
    this.initialize();
  }

  componentWillReceiveProps() {
    this.setState({ value: 0 }, this.initialize);
  }

  componentWillUnmount() {
    if (this.props.animated) clearInterval(this.interval);
  }

  setInterval() {
    clearInterval(this.interval);
    this.interval = setInterval(() => {
      if (this.state.value < this.props.value) {
        this.setState({ value: this.state.value + this.props.progressRate });
      } else {
        clearInterval(this.interval);
      }
    }, 1000 / this.props.fps);
  }

  initialize() {
    if (this.props.animated) {
      this.setInterval();
    } else {
      this.setState({ value: this.props.value });
    }
  }

  generatePath(degrees) {
    const radius = this.props.radius;
    const radians = ((degrees * Math.PI) / 180);
    let x = Math.sin(radians) * radius;
    let y = Math.cos(radians) * -radius;
    const halfEdgeSize = this.props.edgeSize / 2;
    x += halfEdgeSize;
    y += halfEdgeSize;
    const largeArcSweepFlag = degrees > 180 ? 1 : 0;
    const startX = halfEdgeSize;
    const startY = halfEdgeSize - radius;
    return `M${startX},${startY} A${radius},${radius} 0 ${largeArcSweepFlag} 1 ${x},${y} `;
  }

  render() {
    const center = this.props.edgeSize / 2;
    const radius = this.props.radius;
    let degrees;
    let text = '';
    if (this.props.unit === 'percent') {
      const percent = clamp(this.state.value, 0, 100);
      degrees = (percent / 100) * 360;
      degrees = clamp(degrees, 0, 359.9);
      text = this.props.formatText(percent);
    } else {
      degrees = this.state.value;
      degrees = clamp(degrees, 0, 359.9);
      text = this.props.formatText(degrees);
    }

    const pathDescription = this.generatePath(degrees);

    return (
      <svg height={this.props.edgeSize} width={this.props.edgeSize}>
        <circle
          cx={center}
          cy={center}
          r={radius}
          stroke={this.props.circleStroke}
          strokeWidth={this.props.circleStrokeWidth}
          fill={this.props.circleFill}
        />
        <path
          d={pathDescription}
          fill="transparent"
          stroke={this.props.progressStroke}
          strokeWidth={this.props.circleStrokeWidth}
        />
        {
          this.props.displayText &&
          <text x={center} y={center + 10} textAnchor="middle" fontSize="23">{text}%</text>
        }
      </svg>
    );
  }
}

RadialProgress.defaultProps = {
  edgeSize: 100,
  radius: 45,
  circleStrokeWidth: 4,
  circleStroke: '#D8D8D8',
  circleFill: 'transparent',
  progressStroke: '#d9534f',
  unit: 'degrees',
  displayText: true,
  formatText: value => value,
  animated: true,
  fps: 60,
  progressRate: 1
};

RadialProgress.propTypes = {
  edgeSize: PropTypes.number.isRequired,
  radius: PropTypes.number.isRequired,
  circleStrokeWidth: PropTypes.number.isRequired,
  circleStroke: PropTypes.string.isRequired,
  circleFill: PropTypes.string.isRequired,
  progressStroke: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  unit: PropTypes.oneOf(['degrees', 'percent']).isRequired,
  displayText: PropTypes.bool.isRequired,
  formatText: PropTypes.func,
  animated: PropTypes.bool.isRequired,
  fps: PropTypes.number.isRequired,
  progressRate: PropTypes.number.isRequired
};

export default RadialProgress;
