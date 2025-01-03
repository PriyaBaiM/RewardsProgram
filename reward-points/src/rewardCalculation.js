const calculateRewards = (price) => {
    let points = 0;
    if (price > 100) {
      points += (price - 100) * 2;
      price = 100;
    }
    if (price > 50) {
      points += (price - 50) * 1;
    }
    return Math.floor(points);
  };
  
  
  export default calculateRewards;
  