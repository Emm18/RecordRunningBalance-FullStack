import React from 'react';
import { Popover, OverlayTrigger, Button } from 'react-bootstrap'

const HelpPopOver = (props) => (
    <OverlayTrigger trigger="hover" placement="right" overlay={
        <Popover id="popover-basic">
            <Popover.Title as="h3">Keyboard shortcuts</Popover.Title>
            <Popover.Content>
                <strong>Left</strong>: Move to the previous day. <br />
                <strong>Right</strong>: Move to the next day. <br />
                <strong>Up</strong>: Move to the previous week. <br />
                <strong>Down</strong>: Move to the next week. <br />
                <strong>PgUp</strong>: Move to the previous month. <br />
                <strong>PgDn</strong>: Move to the next month. <br />
                <strong>Home</strong>: Move to the previous year. <br />
                <strong>End</strong>: Move to the next year. <br />
                <strong>Enter/Esc/Tab</strong>: close the calendar. <br />
            </Popover.Content>
        </Popover>
    }>
        <Button variant="link" sm>?</Button>
    </OverlayTrigger>
);

export default HelpPopOver;