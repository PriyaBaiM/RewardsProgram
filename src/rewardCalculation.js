import logger from 'react-logger'; 

const calculateRewards = (price) => {
    let points = 0;
    if (price > 100) {
      points += (price - 100) * 2;
      price = 100;
    }
    if (price > 50) {
      points += (price - 50) * 1;
    }

    logger.log('info', `Calculated ${points} reward points for price ${price}`);

    return Math.floor(points);
  };
  
  
  export default calculateRewards;
  