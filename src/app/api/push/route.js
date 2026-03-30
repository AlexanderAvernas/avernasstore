/* import { getKlarnaOrder } from '../../utils/klarnaApi'; // Importera din axios-baserade funktion för att hämta Klarna order
import { getKustomOrder } from '../../utils/kustomApi';

export async function POST(req) {
    try {
        // Logga inkommande headers för debugging
        // console.log('--- Inkommande Headers ---');
        // console.log(JSON.stringify(Object.fromEntries(req.headers), null, 2));

        // Hämta query-parametrar
        const { searchParams } = new URL(req.url);
        const orderId = searchParams.get('order_id'); // Hämta order_id från query-parametern

        // Kontrollera om order_id finns
        if (!orderId) {
            console.error('Ingen order_id hittades i query-parametrarna.');
            return new Response(
                JSON.stringify({ message: 'Missing klarna_order_id in query parameters' }),
                { status: 400, headers: { 'Content-Type': 'application/json' } }
            );
        }

        // Logga mottaget order_id
        // console.log('Order ID från query-param:', orderId);

        // Hämta rå body för debugging (den bör vara tom eller innehålla minimal data)
        const rawBody = await req.text();
        // console.log('--- Inkommande Body ---');
        // console.log(rawBody || 'Tom body');

        // Hämta orderdetaljer från Klarna API baserat på order_id
        const orderDetails = await getKustomOrder(orderId);

        // Logga orderdetaljer (kan användas för vidare bearbetning)
        // console.log('--- Orderdetaljer ---');
        // console.log(orderDetails); // Här kan du justera för att logga specifika delar av ordern

        // Svara till Klarna omedelbart för att stoppa retry-pushar
        const response = new Response(
            JSON.stringify({ message: 'Push notification received successfully', order_id: orderId }),
            { status: 200, headers: { 'Content-Type': 'application/json' } }
        );

        // Bearbeta order asynkront (exempelvis skapa en order i ditt system, acknokera osv.)
        (async () => {
            try {
                // console.log('Bearbetar order asynkront...');

                // Här kan du logga eller hantera orderdetaljer som hämtats från Klarna
                // console.log(`Order ID: ${orderId}`);
                // console.log(`Order Status: ${orderDetails.status}`); // Logga status från Klarna
                // Exempel på att logga shipping information
                if (orderDetails.shipping_address) {
                    // console.log(`Shipping Address: ${orderDetails.shipping_address.street_address}`);
                }
                // Skapa order i din egen databas eller system
                // Skicka acknowledgment till Klarna om ordern ska bekräftas.
                // await acknowledgeOrder(orderId); // Implementera denna funktion om du vill acknokera ordern till Klarna
            } catch (error) {
                // console.error('Fel vid bearbetning av order:', error);
            }
        })();

        return response; // Skicka svar till Klarna
    } catch (error) {
        // console.error('Fel vid hantering av Klarna Push Notification:', error);

        return new Response(
            JSON.stringify({
                message: 'Failed to handle Klarna push notification',
                details: error.message,
            }),
            { status: 500, headers: { 'Content-Type': 'application/json' } }
        );
    }
}
 */

import { getKustomOrder } from '../../utils/kustomApi';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req) {
    try {
        const { searchParams } = new URL(req.url);
        const orderId = searchParams.get('order_id');

        if (!orderId) {
            return new Response(
                JSON.stringify({ message: 'Missing order_id in query parameters' }),
                { status: 400, headers: { 'Content-Type': 'application/json' } }
            );
        }

        const orderDetails = await getKustomOrder(orderId);

        // Svara Kustom/Klarna omedelbart
        const response = new Response(
            JSON.stringify({ message: 'Push notification received successfully', order_id: orderId }),
            { status: 200, headers: { 'Content-Type': 'application/json' } }
        );

        // Skicka bekräftelsemejl asynkront
        (async () => {
            try {
                const customer = orderDetails.billing_address;

                // ✅ Null-check – avbryt om kundmail saknas
                if (!customer?.email) {
                    console.error('Ingen kundmail hittades för order:', orderId);
                    return;
                }

                const orderLines = orderDetails.order_lines?.filter(
                    (line) => line.type !== 'shipping_fee'
                );
                const shippingFee = orderDetails.order_lines?.find(
                    (line) => line.type === 'shipping_fee'
                );

                const itemRows = orderLines?.map((line) => `
                    <tr>
                        <td style="padding: 8px; border-bottom: 1px solid #eee;">${line.name}</td>
                        <td style="padding: 8px; border-bottom: 1px solid #eee; text-align: center;">${line.quantity}</td>
                        <td style="padding: 8px; border-bottom: 1px solid #eee; text-align: right;">${(line.unit_price / 100).toFixed(2)} SEK</td>
                    </tr>
                `).join('');

                await resend.emails.send({
                    //from: 'Margareta Avernas <info@margaretaavernas.se>',
                    from: 'onboarding@resend.dev',
                    //to: customer.email,
                    to: 'info@margaretaavernas.se', // ← temporärt för test
                    bcc: 'info@margaretaavernas.se', // ✅ Kopia till dig själv
                    subject: `Orderbekräftelse – ${orderId}`,
                    html: `
                        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
                            <h2>Tack för din beställning, ${customer.given_name}!</h2>
                            <p>Vi har mottagit din order och börjar behandla den så snart som möjligt.</p>

                            <h3>Ordersammanfattning</h3>
                            <table style="width: 100%; border-collapse: collapse;">
                                <thead>
                                    <tr style="background: #f5f5f5;">
                                        <th style="padding: 8px; text-align: left;">Produkt</th>
                                        <th style="padding: 8px; text-align: center;">Antal</th>
                                        <th style="padding: 8px; text-align: right;">Pris</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    ${itemRows}
                                    <tr>
                                        <td style="padding: 8px;" colspan="2">Frakt</td>
                                        <td style="padding: 8px; text-align: right;">${((shippingFee?.total_amount || 0) / 100).toFixed(2)} SEK</td>
                                    </tr>
                                </tbody>
                                <tfoot>
                                    <tr style="font-weight: bold;">
                                        <td style="padding: 8px;" colspan="2">Totalt</td>
                                        <td style="padding: 8px; text-align: right;">${(orderDetails.order_amount / 100).toFixed(2)} SEK</td>
                                    </tr>
                                </tfoot>
                            </table>

                            <h3>Leveransadress</h3>
                            <p>
                                ${customer.given_name} ${customer.family_name}<br/>
                                ${customer.street_address}<br/>
                                ${customer.postal_code} ${customer.city}
                            </p>

                            <p style="color: #888; font-size: 12px;">Order-ID: ${orderId}</p>
                        </div>
                    `,
                });

                console.log('Bekräftelsemejl skickat till:', customer.email);

            } catch (error) {
                // ✅ Förbättrad felloggning med order-ID
                console.error('Fel vid mejlutskick för order:', orderId, error);
            }
        })();

        return response;

    } catch (error) {
        console.error('Fel vid hantering av push notification:', error);

        return new Response(
            JSON.stringify({
                message: 'Failed to handle push notification',
                details: error.message,
            }),
            { status: 500, headers: { 'Content-Type': 'application/json' } }
        );
    }
}