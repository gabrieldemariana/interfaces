<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
    <xsl:output method="html" indent="yes"/>
    
    <xsl:template match="/Facturae">
        <html>
            <head>
                <title>Factura Electrónica</title>
                <style>
                    body { 
                        font-family: 'Segoe UI', Tahoma, Geneva, sans-serif;
                        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                        padding: 40px;
                        margin: 0;
                        min-height: 100vh;
                        color: #2d3748;
                    }
                    .container { 
                        width: 80%;
                        max-width: 1200px;
                        margin: auto;
                    }
                    h2 {
                        color: white;
                        text-align: center;
                        font-size: 2.5em;
                        text-shadow: 2px 2px 4px rgba(0,0,0,0.2);
                        margin-bottom: 30px;
                    }
                    .card { 
                        background: rgba(255, 255, 255, 0.95);
                        padding: 25px;
                        border-radius: 15px;
                        box-shadow: 0 10px 20px rgba(0,0,0,0.2);
                        margin-bottom: 25px;
                        transition: transform 0.3s ease, box-shadow 0.3s ease;
                        backdrop-filter: blur(10px);
                    }
                    .card:hover {
                        transform: translateY(-5px);
                        box-shadow: 0 15px 30px rgba(0,0,0,0.3);
                    }
                    .title { 
                        font-size: 18px;
                        font-weight: 600;
                        color: #4a5568;
                        display: inline-block;
                        min-width: 200px;
                    }
                    .value { 
                        font-size: 20px;
                        color: #4299e1;
                        font-weight: 500;
                    }
                    .items-card {
                        background: linear-gradient(45deg, #4299e1 0%, #667eea 100%);
                        color: white;
                    }
                    .items-card .title {
                        color: rgba(255,255,255,0.9);
                    }
                    .items-card .value {
                        color: white;
                    }
                    .total-card {
                        background: linear-gradient(45deg, #48bb78 0%, #38b2ac 100%);
                        color: white;
                    }
                    .total-card .title {
                        color: rgba(255,255,255,0.9);
                    }
                    .total-card .value {
                        color: white;
                        font-size: 24px;
                        font-weight: bold;
                    }
                    @media (max-width: 768px) {
                        .container { width: 95%; }
                        .title { display: block; margin-bottom: 5px; }
                    }
                </style>
            </head>
            <body>
                <div class="container">
                    <h2>Detalles de la Factura</h2>
                    <div class="card">
                        <span class="title">Número de Factura:</span> 
                        <span class="value"><xsl:value-of select="Invoices/Invoice/InvoiceHeader/InvoiceNumber"/></span>
                    </div>
                    <div class="card">
                        <span class="title">Fecha de Emisión:</span> 
                        <span class="value"><xsl:value-of select="Invoices/Invoice/InvoiceIssueData/IssueDate"/></span>
                    </div>
                    <div class="card">
                        <span class="title">Empresa Vendedora:</span> 
                        <span class="value"><xsl:value-of select="Parties/SellerParty/LegalEntity/CorporateName"/></span>
                    </div>
                    <div class="card">
                        <span class="title">Cliente:</span> 
                        <span class="value"><xsl:value-of select="Parties/BuyerParty/LegalEntity/CorporateName"/></span>
                    </div>
                    <div class="card total-card">
                        <span class="title">Importe Total:</span> 
                        <span class="value"><xsl:value-of select="Invoices/Invoice/InvoiceTotals/InvoiceTotal"/> EUR</span>
                    </div>
                    
                    <h2>Artículos Facturados</h2>
                    <xsl:for-each select="Invoices/Invoice/Items/InvoiceLine">
                        <div class="card items-card">
                            <span class="title">Descripción:</span>
                            <span class="value"><xsl:value-of select="ItemDescription"/></span><br/>
                            <span class="title">Cantidad:</span>
                            <span class="value"><xsl:value-of select="Quantity"/></span><br/>
                            <span class="title">Precio Unitario:</span>
                            <span class="value"><xsl:value-of select="UnitPriceWithoutTax"/> EUR</span><br/>
                            <span class="title">Total:</span>
                            <span class="value"><xsl:value-of select="TotalCost"/> EUR</span>
                        </div>
                    </xsl:for-each>
                </div>
            </body>
        </html>
    </xsl:template>
</xsl:stylesheet>