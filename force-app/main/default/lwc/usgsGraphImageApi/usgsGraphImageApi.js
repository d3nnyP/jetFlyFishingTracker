import { LightningElement, api, wire } from "lwc";
import { getRecord } from "lightning/uiRecordApi";
export default class UsgsGraphImageApi extends LightningElement {
  @api recordId;
  usgsData;
  location;

  @wire(getRecord, {
    recordId: "$recordId",
    fields: ["Water_Body__c.Name", "Water_Body__c.USGS_Data__c"]
  })
  waterBody({ error, data }) {
    if (data) {
      this.usgsData = data.fields.USGS_Data__c.value;
      this.location = `https://labs.waterdata.usgs.gov/api/graph-images/monitoring-location/${this.usgsData}/?parameterCode=00065&width=1200&title=true&compare=false`;
    } else if (error) {
      console.log("Error fetching Water Body Record:", error);
    }
  }
}
