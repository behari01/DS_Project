import { observer } from 'mobx-react-lite';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useStore } from '../../../app/stores/store';
import { makeStyles } from '@material-ui/core/styles';
import TreeView from '@material-ui/lab/TreeView';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import TreeItem from '@material-ui/lab/TreeItem';


import '../style/styleFront.css'
import LiteraturaPage from '../HomePage/HomePage';



const useStyles = makeStyles({
    root: {
        height: 3000,
        flexGrow: 15,
        maxWidth: 3000,
    },
});

export default observer(function SesionetPage() {



    const [target, setTarget] = useState('');

    const { mesimdhenesiStore } = useStore();

    useEffect(() => {
        mesimdhenesiStore.removeSesions();
        mesimdhenesiStore.loadSesions();
    }, [mesimdhenesiStore]);


    const classes = useStyles();
    const [expanded, setExpanded] = React.useState<string[]>([]);
    const [selected, setSelected] = React.useState<string[]>([]);

    const handleToggle = (event: React.ChangeEvent<{}>, nodeIds: string[]) => {
        setExpanded(nodeIds);
    };

    const handleSelect = (event: React.ChangeEvent<{}>, nodeIds: string[]) => {
        setSelected(nodeIds);
    };

    return (
        <div>

            <div className="boxWhite">
                <h1>LINKU PER SESION</h1>
            </div>


            <TreeView
                className={classes.root}
                defaultCollapseIcon={<ExpandMoreIcon />}
                defaultExpandIcon={<ChevronRightIcon />}
                expanded={expanded}
                selected={selected}
                onNodeToggle={handleToggle}
                onNodeSelect={handleSelect}
            >

                {mesimdhenesiStore.sesions.map((sesion) => (
                    <div>

                        <TreeItem className="Tree" nodeId="1" label={sesion.autori}>
                            <TreeItem className="Tree2" nodeId="2" label={sesion.lenda}>
                                <TreeItem className="Tree2" nodeId="3" label={sesion.klasa}>

                                    <a href={sesion.linku} target="_blank"><h3>Kycu ne sesion</h3></a>
                                </TreeItem>
                            </TreeItem>
                        </TreeItem>
                    </div>

                ))}
            </TreeView>

        </div>
    )
})
