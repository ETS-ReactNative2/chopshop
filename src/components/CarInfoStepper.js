import React, { Component } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/Table";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Slider from "@material-ui/core/Slider";
import Tooltip from "@material-ui/core/Tooltip";
import Button from "@material-ui/core/Button";
import MobileStepper from "@material-ui/core/MobileStepper";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import { ColorBox } from "material-ui-color";
import InputLabel from "@material-ui/core/InputLabel";
import {
  calculateCarCost,
  calculateBodyCost,
  calculateTireCost,
  calculateWheelCost,
  calculateEngineCost,
  calculateDrivetrainCost,
  trapezoidArea,
  octagonArea,
  calculateBodyWeight,
  calculateEngineWeight,
  calculateCarWeight,
  calculateCarLength,
  calculateCarWidth,
} from "../util/carActions";
import {
  WHEEL_RAD,
  WHEEL_WIDTH,
  FRICTION_LIM,
  ENG_POWER,
  BRAKE_SCALAR,
  STEERING_SCALAR,
  REAR_STEERING_SCALAR,
  MAX_SPEED,
  COLOR,
} from "../actions/carConfig";

let CarInfo = ({ state, config, cost, handleSlider, readOnly, focus }) => {
  if (!config) {
    return <div>No Car Selected</div>;
  }

  let carLengthTableCell = (
    <TableCell>
      {(calculateCarLength(config) * 0.0254).toFixed(2) /*inches to m*/} m
    </TableCell>
  );
  let carWidthTableCell = (
    <TableCell>
      {(calculateCarWidth(config) * 0.0254).toFixed(2) /*inches to m*/} m
    </TableCell>
  );
  let activeStep = 0;

  return (
    <React.Fragment>
      <Grid container spacing={0}>
        <Grid item xs={1}></Grid>
        {/* Wheel Radius */}
        {focus == WHEEL_RAD && (
          <Grid item xs={10}>
            <Box height={300}>
              <img src="img/wheelradius_page_blue.png" height={300} />
              <Slider
                id={WHEEL_RAD}
                max={80}
                min={10}
                step={1}
                value={config.wheel_rad}
                getAriaValueText={(value) => `${value} cm`}
                aria-labelledby="discrete-slider-custom"
                valueLabelDisplay="on"
                disabled={readOnly}
                marks={[
                  {
                    value: 10,
                    label: "10 cm",
                  },
                  {
                    value: 80,
                    label: "80 cm",
                  },
                ]}
                onChange={(e, v) => handleSlider(e, v, WHEEL_RAD)}
              />
            </Box>
          </Grid>
        )}
        {/* Wheel Width */}
        {focus == WHEEL_WIDTH && (
          <Grid item xs={10}>
            <Box height={300}>
              <img src="img/wheelwidth_page_blue.png" height={300} />
              <Slider
                id={WHEEL_WIDTH}
                max={80}
                min={5}
                step={1}
                value={config.wheel_width}
                getAriaValueText={(value) => `${value} cm`}
                aria-labelledby="discrete-slider-custom"
                valueLabelDisplay="on"
                disabled={readOnly}
                marks={[
                  {
                    value: 5,
                    label: "5 cm",
                  },
                  {
                    value: 80,
                    label: "80 cm",
                  },
                ]}
                onChange={(e, v) => handleSlider(e, v, WHEEL_WIDTH)}
              />
            </Box>
          </Grid>
        )}
        {/* Tire Tread */}
        {focus == FRICTION_LIM && (
          <Grid item xs={10}>
            <Box height={300}>
              <img src="img/tire_page_blue.png" height={300} />
              <Slider
                id={FRICTION_LIM}
                max={100}
                min={1}
                step={1}
                value={Math.floor(config.friction_lim / 1e2)}
                getAriaValueText={(value) => `${value}`}
                aria-labelledby="discrete-slider-custom"
                valueLabelDisplay="on"
                disabled={readOnly}
                marks={[
                  {
                    value: 1,
                    label: "Less Tread",
                  },
                  {
                    value: 100,
                    label: "More Tread",
                  },
                ]}
                onChange={(e, v) => handleSlider(e, v * 1e2, FRICTION_LIM)}
              />
            </Box>
          </Grid>
        )}
        {/* Engine Power */}
        {focus == ENG_POWER && (
          <Grid item xs={10}>
            <Box height={300}>
              <img src="img/horsepower_page_blue.png" height={300} />
              <Slider
                id={ENG_POWER}
                max={600}
                min={10}
                step={10}
                value={Math.floor(config.eng_power / 1e3)}
                getAriaValueText={(value) => `${value} HP`}
                aria-labelledby="discrete-slider-custom"
                valueLabelDisplay="on"
                disabled={readOnly}
                marks={[
                  {
                    value: 10,
                    label: "10 HP",
                  },
                  {
                    value: 600,
                    label: "600 HP",
                  },
                ]}
                onChange={(e, v) => handleSlider(e, v * 1e3, ENG_POWER)}
              />
            </Box>
          </Grid>
        )}
        {/* Brake Sensitivity */}
        {focus == BRAKE_SCALAR && (
          <Grid item xs={10}>
            <Box height={300}>
              <img src="img/brake_page_blue.png" height={300} />
              <Slider
                id={BRAKE_SCALAR}
                max={2}
                min={0}
                step={0.01}
                value={config.brake_scalar}
                getAriaValueText={(value) => `${value}`}
                aria-labelledby="discrete-slider-custom"
                valueLabelDisplay="on"
                disabled={readOnly}
                marks={[
                  {
                    value: 0,
                    label: "Less Sensitive",
                  },
                  {
                    value: 2,
                    label: "More Sensitive",
                  },
                ]}
                onChange={(e, v) => handleSlider(e, v, BRAKE_SCALAR)}
              />
            </Box>
          </Grid>
        )}
        {/* Steering Sensitivity */}
        {focus == STEERING_SCALAR && (
          <Grid item xs={10}>
            <Box height={300}>
              <img src="img/steering_page_blue.png" height={300} />
              <Slider
                id={STEERING_SCALAR}
                max={2}
                min={0}
                step={0.01}
                value={config.steering_scalar}
                getAriaValueText={(value) => `${value}`}
                aria-labelledby="discrete-slider-custom"
                valueLabelDisplay="on"
                disabled={readOnly}
                marks={[
                  {
                    value: 0,
                    label: "Less Sensitive",
                  },
                  {
                    value: 2,
                    label: "More Sensitive",
                  },
                ]}
                onChange={(e, v) => handleSlider(e, v, STEERING_SCALAR)}
              />
            </Box>
          </Grid>
        )}
        {/* Rear Steering Sensitivity */}
        {focus == REAR_STEERING_SCALAR && (
          <Grid item xs={10}>
            <Box height={300}>
              <img src="img/rearsteering_page_blue.png" height={300} />
              <Slider
                id={REAR_STEERING_SCALAR}
                max={2}
                min={0}
                step={0.01}
                value={config.rear_steering_scalar}
                getAriaValueText={(value) => `${value}`}
                aria-labelledby="discrete-slider-custom"
                valueLabelDisplay="on"
                disabled={readOnly}
                marks={[
                  {
                    value: 0,
                    label: "0",
                  },
                  {
                    value: 2,
                    label: "2",
                  },
                ]}
                onChange={(e, v) => handleSlider(e, v, REAR_STEERING_SCALAR)}
              />
            </Box>
          </Grid>
        )}
        {/* Top Speed Limiter */}
        {focus == MAX_SPEED && (
          <Grid item xs={10}>
            <Box height={300}>
              <img src="img/speed_page_blue.png" height={300} />
              <Slider
                id={MAX_SPEED}
                max={200}
                min={5}
                step={1}
                value={config.max_speed}
                getAriaValueText={(value) => `${value} MPH`}
                aria-labelledby="discrete-slider-custom"
                valueLabelDisplay="on"
                disabled={readOnly}
                marks={[
                  {
                    value: 5,
                    label: "5 MPH",
                  },
                  {
                    value: 200,
                    label: "200 MPH",
                  },
                ]}
                onChange={(e, v) => handleSlider(e, v, MAX_SPEED)}
              />
            </Box>
          </Grid>
        )}
        {/* Paint Color */}
        {focus == COLOR && (
          <Grid item xs={10}>
            <Box
              height={300}
              style={{
                backgroundImage: "url(img/color_page_blue.png)",
                backgroundRepeat: "no-repeat",
              }}
            >
              {/* <img 
                                src='img/color_page_blue.png' 
                                height={300} 
                                style={{
                                    zIndex:2,
                                    position: "relative",
                                    left: "0px",
                                    top: "0px"
                                }}
                            /> */}

              <ColorBox
                value={parseInt(config.color, 16)}
                onChange={(e, v) => handleSlider(e, e.value, COLOR)}
                disabled={readOnly}
                style={{
                  paddingTop: "30px",
                  marginLeft: "240px",
                }}
                disableAlpha
              />

              {/* <Slider
                            id={COLOR}
                            max={16777215}
                            min={5}
                            step={1}
                            value={parseInt(config.color,16)}
                            getAriaValueText={(value) => `${value}`}
                            aria-labelledby="discrete-slider-custom"
                            valueLabelDisplay="off"
                            disabled={readOnly}
                            onChange={(e,v)=>handleSlider(e,v,COLOR)}
                            /> */}
            </Box>
          </Grid>
        )}
        <Grid item xs={12}>
          {/* <MobileStepper
                    variant="dots"
                    steps={6}
                    position="static"
                    activeStep={activeStep}
                    // className={classes.root}
                    nextButton={
                        <Button size="small" onClick={null} disabled={activeStep === 5}>
                        Next
                        
                        </Button>
                    }
                    backButton={
                        <Button size="small" onClick={null} disabled={activeStep === 0}>
                        
                        Back
                        </Button>
                    }
                /> */}
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default CarInfo;
