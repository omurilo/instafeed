import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Animated } from 'react-native';
import { Original, Small } from './styles';

const AnimatedOriginal = Animated.createAnimatedComponent(Original);

export default function LazyImage({
  ratio, smallSource, source, shouldLoad,
}) {
  const opacity = new Animated.Value(0);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (shouldLoad) {
      setLoaded(true);
    }
  }, [shouldLoad]);

  function handleAnimate() {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }

  return (
    <Small ratio={ratio} source={smallSource} blurRadius={2}>
      {loaded && (
        <AnimatedOriginal
          ratio={ratio}
          source={source}
          style={{ opacity }}
          onLoadEnd={handleAnimate}
        />
      )}
    </Small>
  );
}

LazyImage.propTypes = {
  ratio: PropTypes.number.isRequired,
  smallSource: PropTypes.shape({
    uri: PropTypes.string,
  }).isRequired,
  source: PropTypes.shape({
    uri: PropTypes.string,
  }).isRequired,
  shouldLoad: PropTypes.bool.isRequired,
};
