package com.gizhirn.ben;

import com.gizwits.gizwifisdk.enumration.GizWifiDeviceNetStatus;
import com.gizwits.gizwifisdk.enumration.GizWifiDeviceType;

import java.io.Serializable;

/**
 * 作者：HWQ on 2017/10/27 08:54
 * 描述：
 */

public class Device implements Serializable {
    private   String                 macAddress;
    private   String                 did;
    private   String                 ipAddress;
    protected boolean                isLAN;
    private   GizWifiDeviceNetStatus netStatus;
    private   GizWifiDeviceType      productType;
    private   String                 productKey;
    private   String                 productName;
    private   boolean                isBind;
    private   String                 remark;
    private   String                 alias;


    public String getMacAddress() {
        return macAddress;
    }

    public void setMacAddress(String macAddress) {
        this.macAddress = macAddress;
    }

    public String getDid() {
        return did;
    }

    public void setDid(String did) {
        this.did = did;
    }

    public String getIpAddress() {
        return ipAddress;
    }

    public void setIpAddress(String ipAddress) {
        this.ipAddress = ipAddress;
    }

    public boolean isLAN() {
        return isLAN;
    }

    public void setLAN(boolean LAN) {
        isLAN = LAN;
    }

    public GizWifiDeviceNetStatus getNetStatus() {
        return netStatus;
    }

    public void setNetStatus(GizWifiDeviceNetStatus netStatus) {
        this.netStatus = netStatus;
    }

    public GizWifiDeviceType getProductType() {
        return productType;
    }

    public void setProductType(GizWifiDeviceType productType) {
        this.productType = productType;
    }

    public String getProductKey() {
        return productKey;
    }

    public void setProductKey(String productKey) {
        this.productKey = productKey;
    }

    public String getProductName() {
        return productName;
    }

    public void setProductName(String productName) {
        this.productName = productName;
    }

    public boolean isBind() {
        return isBind;
    }

    public void setBind(boolean bind) {
        isBind = bind;
    }

    public String getRemark() {
        return remark;
    }

    public void setRemark(String remark) {
        this.remark = remark;
    }

    public String getAlias() {
        return alias;
    }

    public void setAlias(String alias) {
        this.alias = alias;
    }
}
