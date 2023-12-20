export default {
  width: 300,
  height: 300,
  left: 0,
  top: 0,
  data: [
    {
      name: "111",
      positions: "95.3191, 50.109, 0",
      rowid: "23232",
    },
  ],
  styleObj: {
    showTitle: false,
    title: {
      text: "",
      width: 40,
      height: 40,
      bgImg: "",
      textAlign: "center",
      color: "#000000",
      fontSize: "16px",
      offsetY: 0,
    },
    // position: [121.3631405, 28.396614, 19],
    name: "fdfdf",
    customAttribute: {
      id: "111",
      type: "camera",
    },
    show: true,
    position: [95.3191 + Math.random() * 205, 0.109 + Math.random() * 205, 0],
    distanceDisplayCondition: [0, 900000000],
    boardList: [
      {
        billboard: {
          image:
            "",
          activeImage:
            "",
          scale: 0.6,
          pixelOffset: [0, 0],
          width: 40,
          height: 40,
        },
        label: {
          text: "99+",
          font: "12px sans-serif",
          pixelOffset: [20, -40],
          fillColor: Cesium.Color.WHITE,
          outlineColor: Cesium.Color.BLACK,
          outlineWidth: 4,
        },
      },
    ],
  },
  isShowModule: false,
};
