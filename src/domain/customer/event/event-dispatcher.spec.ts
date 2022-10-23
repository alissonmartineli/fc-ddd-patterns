import EventDispatcher from "../../@shared/event/event-dispatcher";
import Address from "../value-object/address";
import AddressChangedEvent from "./address-changed.event";
import CustomerCreatedEvent from "./customer-created.event";
import LogWhenAddressIsChangedHandler from "./handler/log-when-address-if-changed.handler";
import Log1WhenCustomerIsCreatedHandler from "./handler/log1-when-customer-is-updated.handler";
import Log2WhenCustomerIsCreatedHandler from "./handler/log2-when-customer-is-updated.handler";

describe('Customer events', () => {
    it('should notify all handlers when a customer is create', () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandler1 = new Log1WhenCustomerIsCreatedHandler();
        const eventHandler2 = new Log2WhenCustomerIsCreatedHandler();
        const spyEventHandler1 = jest.spyOn(eventHandler1, "handle");
        const spyEventHandler2 = jest.spyOn(eventHandler2, "handle");

        eventDispatcher.register("CustomerCreatedEvent", eventHandler1);
        eventDispatcher.register("CustomerCreatedEvent", eventHandler2);

        const customerCreatedEvent = new CustomerCreatedEvent({
            name: "Customer 1"
        });

        eventDispatcher.notify(customerCreatedEvent);

        expect(spyEventHandler1).toHaveBeenCalled();
        expect(spyEventHandler2).toHaveBeenCalled();
    })

    it('should notify all handlers when a address is change', () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandler = new LogWhenAddressIsChangedHandler();
        const spyEventHandler = jest.spyOn(eventHandler, "handle");

        eventDispatcher.register("AddressChangedEvent", eventHandler);

        const newAddress = new Address('Street 1', 123, '11300-000', 'São Paulo')

        const addressChangedEvent = new AddressChangedEvent({
            customerId: "c1",
            customerName: "Customer 1",
            newAddress: newAddress.toString()
        });

        eventDispatcher.notify(addressChangedEvent);

        expect(spyEventHandler).toHaveBeenCalled();
    })
})
