import React, { useState, useEffect, ReactPropTypes } from 'react';
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
  ratio: ReactPropTypes.number.isRequired,
  smallSource: ReactPropTypes.Shape({
    uri: ReactPropTypes.string,
  }).isRequired,
  source: ReactPropTypes.Shape({
    uri: ReactPropTypes.string,
  }).isRequired,
  shouldLoad: ReactPropTypes.bool.isRequired,
};
