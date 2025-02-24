<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" 
                xmlns:fe="http://www.facturae.es/Facturae/2007/v3.1/Facturae" exclude-result-prefixes="fe">

    <xsl:output method="html" indent="yes"/>

    <xsl:template match="/*">
        <html>
            <head>
                <title>Factura Electrónica</title>
                <style>
                    body { font-family: Arial, sans-serif; background-color: #f8f9fa; padding: 20px; }
                    .container { width: 60%%; margin: auto; }
                    .card { background: white; padding: 20px; border-radius: 10px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); margin-bottom: 20px; }
                    .title { font-size: 20px; font-weight: bold; }
                    .value { font-size: 18px; color: #007bff; }
                </style>
            </head>
            <body>
                <div class="container">
                    <h2>Detalles de la Factura</h2>
                    <div class="card">
                        <span class="title">Número de Factura:</span> 
                        <span class="value"><xsl:value-of select="//*[local-name()='InvoiceNumber']"/></span>
                    </div>
                    <div class="card">
                        <span class="title">Fecha de Emisión:</span> 
                        <span class="value"><xsl:value-of select="//*[local-name()='IssueDate']"/></span>
                    </div>
                    <div class="card">
                        <span class="title">Empresa Vendedora:</span> 
                        <span class="value"><xsl:value-of select="//*[local-name()='SellerParty']//*[local-name()='CorporateName']"/></span>
                    </div>
                    <div class="card">
                        <span class="title">Cliente:</span> 
                        <span class="value">
                            <xsl:choose>
                                <xsl:when test="//*[local-name()='BuyerParty']//*[local-name()='Individual']">
                                    <xsl:value-of select="//*[local-name()='BuyerParty']//*[local-name()='Individual']//*[local-name()='Name']"/> 
                                    <xsl:value-of select="//*[local-name()='BuyerParty']//*[local-name()='Individual']//*[local-name()='FirstSurname']"/>
                                </xsl:when>
                                <xsl:otherwise>
                                    <xsl:value-of select="//*[local-name()='BuyerParty']//*[local-name()='LegalEntity']//*[local-name()='CorporateName']"/>
                                </xsl:otherwise>
                            </xsl:choose>
                        </span>
                    </div>
                    <div class="card">
                        <span class="title">Importe Total:</span> 
                        <span class="value"><xsl:value-of select="//*[local-name()='InvoiceTotals']//*[local-name()='InvoiceTotal']"/> EUR</span>
                    </div>
                </div>
            </body>
        </html>
    </xsl:template>
</xsl:stylesheet>