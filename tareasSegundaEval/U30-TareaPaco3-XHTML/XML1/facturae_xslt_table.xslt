<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" 
                xmlns:fe="http://www.facturae.es/Facturae/2007/v3.1/Facturae" exclude-result-prefixes="fe">

    <xsl:output method="html" indent="yes"/>

    <xsl:template match="/*">
        <html>
            <head>
                <title>Factura Electrónica</title>
                <style>
                    table { width: 100%; border-collapse: collapse; }
                    th, td { border: 1px solid black; padding: 8px; text-align: left; }
                    th { background-color: #f2f2f2; }
                </style>
            </head>
            <body>
                <h2>Detalles de la Factura</h2>
                <table>
                    <tr>
                        <th>Número de Factura</th>
                        <td><xsl:value-of select="//*[local-name()='InvoiceNumber']"/></td>
                    </tr>
                    <tr>
                        <th>Fecha de Emisión</th>
                        <td><xsl:value-of select="//*[local-name()='IssueDate']"/></td>
                    </tr>
                    <tr>
                        <th>Empresa Vendedora</th>
                        <td><xsl:value-of select="//*[local-name()='SellerParty']//*[local-name()='CorporateName']"/></td>
                    </tr>
                    <tr>
                        <th>Cliente</th>
                        <td>
                            <xsl:choose>
                                <xsl:when test="//*[local-name()='BuyerParty']//*[local-name()='Individual']">
                                    <xsl:value-of select="//*[local-name()='BuyerParty']//*[local-name()='Individual']//*[local-name()='Name']"/> 
                                    <xsl:value-of select="//*[local-name()='BuyerParty']//*[local-name()='Individual']//*[local-name()='FirstSurname']"/>
                                </xsl:when>
                                <xsl:otherwise>
                                    <xsl:value-of select="//*[local-name()='BuyerParty']//*[local-name()='LegalEntity']//*[local-name()='CorporateName']"/>
                                </xsl:otherwise>
                            </xsl:choose>
                        </td>
                    </tr>
                    <tr>
                        <th>Importe Total</th>
                        <td><xsl:value-of select="//*[local-name()='InvoiceTotals']//*[local-name()='InvoiceTotal']"/> EUR</td>
                    </tr>
                </table>
            </body>
        </html>
    </xsl:template>

</xsl:stylesheet>