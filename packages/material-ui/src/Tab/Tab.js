// @inheritedComponent ButtonBase

import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import withStyles from '../styles/withStyles';
import ButtonBase from '../ButtonBase';
import { capitalize } from '../utils/helpers';

export const styles = theme => ({
  root: {
    ...theme.typography.button,
    maxWidth: 264,
    position: 'relative',
    minWidth: 72,
    padding: 0,
    height: 48,
    flex: 'none',
    overflow: 'hidden',
    [theme.breakpoints.up('md')]: {
      minWidth: 160,
    },
  },
  labelIcon: {
    height: 72,
  },
  textColorInherit: {
    color: 'inherit',
    opacity: 0.7,
    '&$selected': {
      opacity: 1,
    },
    '&$disabled': {
      opacity: 0.4,
    },
  },
  textColorPrimary: {
    color: theme.palette.text.secondary,
    '&$selected': {
      color: theme.palette.primary.main,
    },
    '&$disabled': {
      color: theme.palette.text.disabled,
    },
  },
  textColorSecondary: {
    color: theme.palette.text.secondary,
    '&$selected': {
      color: theme.palette.secondary.main,
    },
    '&$disabled': {
      color: theme.palette.text.disabled,
    },
  },
  selected: {},
  disabled: {},
  fullWidth: {
    flexGrow: 1,
  },
  wrapper: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    flexDirection: 'column',
  },
  labelContainer: {
    paddingTop: 6,
    paddingBottom: 6,
    paddingLeft: 12,
    paddingRight: 12,
    [theme.breakpoints.up('md')]: {
      paddingLeft: theme.spacing.unit * 3,
      paddingRight: theme.spacing.unit * 3,
    },
  },
  label: {
    fontSize: theme.typography.pxToRem(14),
    whiteSpace: 'normal',
    [theme.breakpoints.up('md')]: {
      fontSize: theme.typography.pxToRem(13),
    },
  },
  labelWrapped: {
    [theme.breakpoints.down('sm')]: {
      fontSize: theme.typography.pxToRem(12),
    },
  },
});

class Tab extends React.Component {
  state = {
    wrappedText: false,
  };

  componentDidMount() {
    this.checkTextWrap();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.wrappedText === prevState.wrappedText) {
      /**
       * At certain text and tab lengths, a larger font size may wrap to two lines while the smaller
       * font size still only requires one line.  This check will prevent an infinite render loop
       * fron occurring in that scenario.
       */
      this.checkTextWrap();
    }
  }

  handleChange = event => {
    const { onChange, value, onClick } = this.props;

    if (onChange) {
      onChange(event, value);
    }

    if (onClick) {
      onClick(event);
    }
  };

  label = undefined;

  checkTextWrap = () => {
    if (this.label) {
      const wrappedText = this.label.getClientRects().length > 1;
      if (this.state.wrappedText !== wrappedText) {
        this.setState({ wrappedText });
      }
    }
  };

  render() {
    const {
      classes,
      className: classNameProp,
      disabled,
      fullWidth,
      icon,
      indicator,
      label: labelProp,
      onChange,
      selected,
      textColor,
      value,
      ...other
    } = this.props;

    let label;

    if (labelProp !== undefined) {
      label = (
        <span className={classes.labelContainer}>
          <span
            className={classNames(classes.label, {
              [classes.labelWrapped]: this.state.wrappedText,
            })}
            ref={node => {
              this.label = node;
            }}
          >
            {labelProp}
          </span>
        </span>
      );
    }

    const className = classNames(
      classes.root,
      classes[`textColor${capitalize(textColor)}`],
      {
        [classes.disabled]: disabled,
        [classes.selected]: selected,
        [classes.labelIcon]: icon && label,
        [classes.fullWidth]: fullWidth,
      },
      classNameProp,
    );

    return (
      <ButtonBase
        focusRipple
        className={className}
        role="tab"
        aria-selected={selected}
        disabled={disabled}
        {...other}
        onClick={this.handleChange}
      >
        <span className={classes.wrapper}>
          {icon}
          {label}
        </span>
        {indicator}
      </ButtonBase>
    );
  }
}

Tab.propTypes = {
  /**
   * Override or extend the styles applied to the component.
   * See [CSS API](#css-api) below for more details.
   */
  classes: PropTypes.object.isRequired,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * If `true`, the tab will be disabled.
   */
  disabled: PropTypes.bool,
  /**
   * @ignore
   */
  fullWidth: PropTypes.bool,
  /**
   * The icon element.
   */
  icon: PropTypes.node,
  /**
   * @ignore
   * For server side rendering consideration, we let the selected tab
   * render the indicator.
   */
  indicator: PropTypes.node,
  /**
   * The label element.
   */
  label: PropTypes.node,
  /**
   * @ignore
   */
  onChange: PropTypes.func,
  /**
   * @ignore
   */
  onClick: PropTypes.func,
  /**
   * @ignore
   */
  selected: PropTypes.bool,
  /**
   * @ignore
   */
  textColor: PropTypes.oneOf(['secondary', 'primary', 'inherit']),
  /**
   * You can provide your own value. Otherwise, we fallback to the child position index.
   */
  value: PropTypes.any,
};

Tab.defaultProps = {
  disabled: false,
  textColor: 'inherit',
};

export default withStyles(styles, { name: 'MuiTab' })(Tab);
