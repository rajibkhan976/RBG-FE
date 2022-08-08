import React, { useEffect, useState } from 'react'
import { Page, Document, StyleSheet, Font } from "@react-pdf/renderer";
import moment from 'moment';
import ReactDOMServer from "react-dom/server";
import Html from 'react-pdf-html';
import source from './Lato-Regular.ttf';

export default function PDFDocument(props) {
    const transactionData = { ...props.transactionData, orgCode: props.org.organizationCode };
    const organizationData = { name: props.org.organization };
    const contactData = props.contact;

    Font.register({ family: 'Lato', src: source });

    const styles = StyleSheet.create({
        body: {
            padding: "0",
            margin: "0"
        },
        container: {
            width: "100%",
            padding: "10px 10px 10px 10px",
            position: "relative",
            margin: "0"
        },
        header: {
            width: "100%",
            padding: "0px 10px 10px",
            borderBottom: "1px solid #ededed",
            fontFamily: "Lato",
            marginBottom: "20px",
        },
        main: {
            width: "100%",
            margin: "0",
            padding: "0",
            fontFamily: "Lato",
        },
        h2: {
            fontWeight: "bold",
            fontSize: "24px",
            margin: "0 0 10px 0",
            textAlign: "center",
            textDecorationLine: "underline",
            fontFamily: "Lato",
            color: "#305671",
        },
        table: {
            width: "100%",
            border: "none"
        },
        org1: {
            fontWeight: "bold",
            fontSize: "19px",
            color: "#305671",
        },
        text: {
            fontSize: "10px",
            fontWeight: "bold",
            color: "#305671",
        },
        left: {
            textAlign: "left",
        },
        right: {
            textAlign: "right",
        },
        span1: {
            fontWeight: "400",
        },
        text2: {
            fontSize: "10px",
            color: "#305671",
            paddingBottom: "5px",
            paddingLeft: "10px",
        },
        text3: {
            fontSize: "17px",
            fontWeight: "bold",
            color: "#305671",
            paddingBottom: "7px",
            paddingLeft: "10px",

        },
        text4: {
            fontSize: "12px",
            color: "#97AAB8",
            paddingBottom: "3px",
            paddingLeft: "10px",
        },
        tableWrapper: {
            marginTop: "30px",
            padding: "0 10px",
        },
        tableQ: {
            width: "100%",
        },
        tableQTH: {
            background: "#305671",
            color: "#fff",
            fontWeight: "bold",
            textAlign: "left",
            fontSize: "12px",
            padding: "8px 6px",
        },
        tableQTD: {
            color: "#305671",
            textAlign: "left",
            fontSize: "10px",
            padding: "8px 6px",
            background: "#fff",
            wordBreak: "break-all",
        },
        tableQTDAlt: {
            color: "#305671",
            textAlign: "left",
            fontSize: "10px",
            padding: "8px 6px",
            background: "#F5FAFF",
        },
        bigfooterTD: {
            color: "#305671",
            textAlign: "left",
            fontSize: "10px",
            padding: "8px 6px",

        },
        bigfooterP: {
            textAlign: "left",
            fontSize: "10px",
            padding: "8px 6px",
            margin: "0",

        },
        bigfooterSpan: {
            color: "#97AAB8",
        },
        text6: {
            color: "#305671",
            textAlign: "left",
            fontSize: "12px",
            padding: "8px 6px",
            fontWeight: "bold",

        },
        text7: {
            color: "#97AAB8",
            fontSize: "11px",
            paddingBottom: "5px",
        },
        text8: {
            color: "#444",
            borderTop: "1px solid #ddd",
            paddingTop: "5px",
            fontSize: "11px",
        },
        footer: {
            padding: "20px 10px 10px"
        }
    });

    const getPDFHTML = (txn, contact, org) => {
        const date = new Date();
        const transactionDate = moment(txn[0].transaction_date).format("LLL");
        const isRefund = (txn[0].amount < 0) ? true : false;
        // const transactionDate = txn[0].transaction_date;
        let subTotal = 0;
        return (<html lang="en">
            <head>
            </head>
            <body style={styles.body}>
                <div style={styles.container}>
                    <div style={styles.header}>
                        <h2 style={styles.h2}>Tax Invoice</h2>
                        <table style={styles.table}
                            border={0}
                            cellSpacing={0}
                            cellPadding={0}>
                            <tr>
                                <td style={styles.left}>
                                    <div style={styles.org1} >{org.name}</div>
                                </td>
                                <td style={styles.right}>
                                    <div style={styles.text}>
                                        Invoice Number : <span style={styles.span1}> {txn[0].transactionId}</span></div>
                                    <div style={styles.text}>Transaction Date : <span style={styles.span1}> {props.transactionDate} </span></div>
                                </td>
                            </tr>
                        </table>
                    </div>
                    <div style={styles.main}>
                        <div style={styles.text2}>Bill To,</div>
                        <div style={styles.text3}> {contact.firstName + " " + contact.lastName}</div>
                        <div style={styles.text4}> {contact.email}</div>
                        <div style={styles.text4}> {(contact.phone?.number) ? contact.phone.dailCode + "-" + contact.phone?.number : ""}</div>
                        {(!isRefund) ? (
                            <div style={styles.tableWrapper}>
                                {txn[0].transaction_for === "product" ?
                                    (
                                        <table style={styles.tableQ} border={0} cellSpacing={0} cellPadding={0}>
                                            <thead>
                                                <tr>
                                                    <th style={styles.tableQTH}>No.</th>
                                                    <th style={styles.tableQTH}>Description</th>
                                                    <th style={styles.tableQTH}>Color</th>
                                                    <th style={styles.tableQTH}>Size</th>
                                                    <th style={styles.tableQTH}>Price</th>
                                                    <th style={styles.tableQTH}>Qty</th>
                                                    <th style={styles.tableQTH}>Total</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {Array.isArray(txn[0].transaction_data) && txn[0].transaction_data.map((el, index) => {
                                                    const price = (!isRefund) ? Number((el?.price * el?.qnty)) : txn[0].amount;
                                                    subTotal = (!isRefund) ? subTotal + price : txn[0].amount;
                                                    return (<tr>
                                                        <td style={styles.tableQTD}>{index + 1}.</td>
                                                        <td style={styles.tableQTD}>{(!isRefund) ? el.product : "Refund for " + el.product}</td>
                                                        <td style={styles.tableQTD}>{el?.color || "-"}</td>
                                                        <td style={styles.tableQTD}>{el?.size || "-"}</td>
                                                        <td style={styles.tableQTD}>{(!isRefund) ? "$" + el?.price : "-"}</td>
                                                        <td style={styles.tableQTD}>{(!isRefund) ? el?.qnty : "-"}</td>
                                                        <td style={styles.tableQTD}>${price.toFixed(2)}</td>
                                                    </tr>);
                                                })}
                                                <tr style={styles.total}>
                                                    <td style={styles.tableQTD}>&nbsp;</td>
                                                    <td style={styles.tableQTD}>&nbsp;</td>
                                                    <td style={styles.tableQTD}>&nbsp;</td>
                                                    <td style={styles.tableQTD}>&nbsp;</td>
                                                    <td style={styles.tableQTD}>Sub Total  :</td>
                                                    <td style={styles.tableQTD}>&nbsp;</td>
                                                    <td style={styles.tableQTD}>${subTotal.toFixed(2)}</td>
                                                </tr>
                                                <tr style={styles.total}>
                                                    <td style={styles.tableQTD}>&nbsp;</td>
                                                    <td style={styles.tableQTD}>&nbsp;</td>
                                                    <td style={styles.tableQTD}>&nbsp;</td>
                                                    <td style={styles.tableQTD}>&nbsp;</td>
                                                    <td style={styles.tableQTD}>Tax  :</td>
                                                    <td style={styles.tableQTD}>&nbsp;</td>
                                                    <td style={styles.tableQTD}> {(!isRefund) ? "$" + (txn[0].amount - subTotal).toFixed(2) : "-"}</td>
                                                </tr>
                                                <tr style={styles.total}>
                                                    <td style={styles.tableQTD}>&nbsp;</td>
                                                    <td style={styles.tableQTD}>&nbsp;</td>
                                                    <td style={styles.tableQTD}>&nbsp;</td>
                                                    <td style={styles.tableQTD}>&nbsp;</td>
                                                    <td style={styles.tableQTD}>Total  :</td>
                                                    <td style={styles.tableQTD}>&nbsp;</td>
                                                    <td style={styles.tableQTD}>${(txn[0].amount).toFixed(2)}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    ) :
                                    (
                                        <table style={styles.tableQ} border={0} cellSpacing={0} cellPadding={0}>
                                            <thead >
                                                <tr>
                                                    <th style={styles.tableQTH}>No.</th>
                                                    <th style={styles.tableQTH}>Program Name</th>
                                                    <th style={styles.tableQTH}>Program Start</th>
                                                    <th style={styles.tableQTH}>Price</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td style={styles.tableQTD}>1.</td>
                                                    <td style={styles.tableQTD}>{(!isRefund) ? txn[0].transaction_data.course : "Refund for " + txn[0].transaction_data.course}</td>
                                                    <td style={styles.tableQTD}>{moment(txn[0].transaction_data.course_start).format("LL")}</td>
                                                    <td style={styles.tableQTD}>${txn[0].amount.toFixed(2)}</td>
                                                </tr>
                                                <tr style={styles.total}>
                                                    <td style={styles.tableQTD}>&nbsp;</td>
                                                    <td style={styles.tableQTD}>&nbsp;</td>
                                                    <td style={styles.tableQTD}>Total  :</td>
                                                    <td style={styles.tableQTD}>${(txn[0].amount).toFixed(2)}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    )}
                            </div>
                        ): ''}
                        
                        <div style={styles.tableWrapper}>
                            <table style={styles.tableQ} border={0} cellSpacing={0} cellPadding={0}>
                                <thead>
                                    <tr>
                                        <th style={styles.tableQTH}>Description</th>
                                        <th style={styles.tableQTH}>Payment Mode</th>
                                        <th style={styles.tableQTH}>Transaction ID</th>
                                        <th style={styles.tableQTH}>Total </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {txn.map(el => {
                                        console.log("Transaction Type",el);
                                        let desc = "";
                                        if(isRefund) {
                                            desc = "Refund Note: "+el?.note;
                                        } else if(el?.transaction_for === "product") {
                                            desc = "Product"
                                        } else {
                                            desc = "Program - "+el?.payment_for.charAt(0).toUpperCase() + el?.payment_for.slice(1);
                                        }
                                        // const desc = (isRefund) ? "Refund Note: "+el?.note : el?.payment_for.charAt(0).toUpperCase() + el?.payment_for.slice(1);
                                        // const desc = (!isRefund) ? (el.transaction_type === "tuiton_fees") ? "Tuition Fees" : el.transaction_type.charAt(0).toUpperCase() + el.transaction_type.slice(1) : el.note;
                                        return (<tr>
                                            <td style={styles.tableQTD}>{desc}</td>
                                            <td style={styles.tableQTD}>{el.payment_via.charAt(0).toUpperCase() + el.payment_via.slice(1)}</td>
                                            <td style={styles.tableQTD}> {el._id}</td>
                                            <td style={styles.tableQTD}>${Math.abs(el.amount).toFixed(2)}</td>
                                        </tr>)
                                    })}
                                    <tr style={styles.bigfooter} >
                                        {(txn[0].payment_via !== "cash" && !isRefund) ?
                                            (<td style={styles.bigfooterTD}>
                                                <div style={styles.bigfooterP}>
                                                    <span style={styles.bigfooterSpan}>{(txn[0].payment_resp.hasOwnProperty("bank_account")) ? "Bank Details:" : "Credit Card Details:"}:</span>
                                                    XXXX{(txn[0].payment_resp.hasOwnProperty("bank_account")) ? txn[0].payment_resp.bank_account.last4 : txn[0].payment_resp.card.last4}
                                                </div>
                                                <div style={styles.bigfooterP}>
                                                    <span style={styles.bigfooterSpan}>{(txn[0].payment_resp.hasOwnProperty("bank_account")) ? "Routing Number:" : "Expiry Date:"} </span>
                                                    {(txn[0].payment_resp.hasOwnProperty("bank_account")) ? txn[0].payment_resp.bank_account.routing_number : txn[0].payment_resp.card.expiration_month + "/" + txn[0].payment_resp.card.expiration_year}
                                                </div>
                                            </td>) :
                                            (<td style={styles.bigfooterP}>{(isRefund) ? "Refunded via original method" : ""}</td>)}
                                        <td>&nbsp;</td>
                                        <td style={styles.text6}>{(isRefund) ? "Total Refunded" : "Total Paid"} :</td>
                                        <td style={styles.text6}>${Math.abs(txn[0].amount).toFixed(2)}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div style={styles.footer}>
                        <div style={styles.text7}>Note : This is a digitally generated document and does not require any signature.</div>
                        <div style={styles.text8}>© redbeltgym.com {date.getFullYear()}</div>
                    </div>
                </div>
            </body>
        </html>);
    };

    // const htmlelem = (transactionData.transaction_for === "product") ?
    //     getProductPDFHTML([transactionData], contactData, organizationData) :
    //     getCoursePDFHTML([transactionData], contactData, organizationData);
    const htmlelem = getPDFHTML([transactionData], contactData, organizationData);

    // const element = (
    //     <html>
    //         <body>
    //             <style>
    //                 {`
    //           .heading4 {
    //             background: darkgreen;
    //             color: white;
    //           }
    //           pre {
    //             background-color: #eee;
    //             padding: 10px;
    //           }`}
    //             </style>
    //             <div>
    //                 {props.transactionData._id}
    //                 <svg height="100" width="100">
    //                     <circle
    //                         cx="50"
    //                         cy="50"
    //                         r="40"
    //                         stroke="black"
    //                         stroke-width="3"
    //                         fill="red"
    //                     />
    //                 </svg>
    //             </div>
    //         </body>
    //     </html>
    // );

    return (
        <Document>
            <Page>
                <Html>{ReactDOMServer.renderToStaticMarkup(htmlelem)}</Html>
            </Page>
        </Document>
    )
};
