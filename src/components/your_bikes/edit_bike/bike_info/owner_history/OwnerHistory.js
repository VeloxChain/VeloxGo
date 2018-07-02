import React from 'react';
import Datatable from '../../../../datatable/Datatable';
import styles from './OwnerHistoryStyle';

const dataHeading = [
    {value: "ex_owner_address", title: "Ex-Owner Address"},
    {value: "email", title: "Email"},
    {value: "status", title: "Status"}
];

const dataBody = [
    {ex_owner_address: "0x000e00023e4234000edf003450000e00060", email: "tuan@enablestartup.com", status: "Verified"},
    {ex_owner_address: "0xdda69c417c81909048f5de374057cc83e4f39e67", email: "eric.bui@enablestartup.com", status: "Verified"},
    {ex_owner_address: "0x00wer00000df002300044450fg00er5400430", email: "vuong.pham@enablestartup.com", status: "Verified"},
    {ex_owner_address: "0xdda69c417c81909048f5de374057cc83e4f39e67", email: "lay.vo@enablestartup.com", status: "Verified"},
    {ex_owner_address: "0x0030002342340000000000gf0000000", email: "trung@enablestartup.com", status: "Verified"},
    {ex_owner_address: "0x0040023400000d000000r00000534500", email: "ai.bui@enablestartup.com", status: "Verified"},
    {ex_owner_address: "0x00c0000x000er00000r003423400g034000", email: "tam.le@enablestartup.com", status: "Verified"},
    {ex_owner_address: "0x00r000000234du0000c002345003400h003400", email: "thao.mai@enablestartup.com", status: "Verified"},
];

class OwnerHistory extends React.Component {
    
    render() {
        return (
            <div style={styles.table} className="table-bike">
                <Datatable
                    params={dataHeading}
                    body={dataBody}
                />
            </div>
        );
    }
}

export default OwnerHistory;
