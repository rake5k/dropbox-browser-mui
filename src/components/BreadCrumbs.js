import _ from 'lodash';
import { withStyles } from 'material-ui/styles';
import HomeIcon from 'material-ui-icons/Home';
import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';

const styles = {
    cell: {
        display: 'inline-block',
        marginLeft: 5,
        overflow: 'hidden',
        textOverflow: 'ellipsis',
    },
    icon: {
        height: 18,
        verticalAlign: 'bottom',
        width: 18,
    },
    link: {
        color: 'inherit',
    },
    row: {
        flex: 0,
        marginLeft: 15,
        textAlign: 'right',
        whiteSpace: 'nowrap',
        width: '100%',
    },
};

function BreadCrumbs({ classes, location }) {
    const breadCrumbs = location.split('/');
    return (
        <div className={classes.row}>
            {breadCrumbs.map((breadCrumb, index) => {
                const label =
                    index === 0 ? (
                        <HomeIcon className={classes.icon} />
                    ) : (
                        breadCrumb
                    );
                const style = _.isEmpty(breadCrumb)
                    ? {}
                    : {
                          maxWidth: `calc((100% - 23px) / ${breadCrumbs.length -
                              1})`,
                      };
                const path = breadCrumbs.slice(1, index + 1);
                return (
                    <div className={classes.cell} style={style} key={index}>
                        {breadCrumb && ' > '}
                        <Link
                            className={classes.link}
                            to={`/${path.join('/')}`}
                        >
                            {label}
                        </Link>
                    </div>
                );
            })}
        </div>
    );
}

BreadCrumbs.propTypes = {
    location: PropTypes.string.isRequired,
};

export default withStyles(styles)(BreadCrumbs);
