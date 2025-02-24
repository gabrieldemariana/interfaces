<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
    <xsl:output method="html" indent="yes"/>
    
    <xsl:template match="/Facturae">
        <html>
            <head>
                <title>Factura Electrónica</title>
                <style>
                    table { width: 100%%; border-collapse: collapse; }
                    th, td { border: 1px solid black; padding: 8px; text-align: left; }
                    th { background-color: #f2f2f2; }
                </style>
            </head>
            <body>
                <h2>Detalles de la Factura</h2>
                <table>
                    <tr>
                        <th>Número de Factura</th>
                        <td><xsl:value-of select="Invoices/Invoice/InvoiceHeader/InvoiceNumber"/></td>
                    </tr>
                    <tr>
                        <th>Fecha de Emisión</th>
                        <td><xsl:value-of select="Invoices/Invoice/InvoiceIssueData/IssueDate"/></td>
                    </tr>
                    <tr>
                        <th>Empresa Vendedora</th>
                        <td><xsl:value-of select="Parties/SellerParty/LegalEntity/CorporateName"/></td>
                    </tr>
                    <tr>
                        <th>Cliente</th>
                        <td><xsl:value-of select="Parties/BuyerParty/LegalEntity/CorporateName"/></td>
                    </tr>
                    <tr>
                        <th>Importe Total</th>
                        <td><xsl:value-of select="Invoices/Invoice/InvoiceTotals/InvoiceTotal"/> EUR</td>
                    </tr>
                </table>
                
                <h2>Artículos Facturados</h2>
                <table>
                    <tr>
                        <th>Descripción</th>
                        <th>Cantidad</th>
                        <th>Precio Unitario</th>
                        <th>Total</th>
                    </tr>
                    <xsl:for-each select="Invoices/Invoice/Items/InvoiceLine">
                        <tr>
                            <td><xsl:value-of select="ItemDescription"/></td>
                            <td><xsl:value-of select="Quantity"/></td>
                            <td><xsl:value-of select="UnitPriceWithoutTax"/> EUR</td>
                            <td><xsl:value-of select="TotalCost"/> EUR</td>
                        </tr>
                    </xsl:for-each>
                </table>
            </body>
        </html>
    </xsl:template>
</xsl:stylesheet>