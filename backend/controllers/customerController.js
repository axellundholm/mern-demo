import * as customerService from "../services/customerService.js";

export async function syncCustomers(req, res) {
  const activeAccountHolders = await customerService.syncCustomers();
  res.status(200).send(activeAccountHolders);
}

export async function createCustomer(req, res) {
  const customer = await customerService.createCustomer(req.body);
  res.status(201).send(customer);
}

export async function listCustomers(req, res) {
  const result = await customerService.listCustomers();
  res.status(200).send(result);
}

export async function getCustomer(req, res) {
  const customer = await customerService.getCustomerById(req.params.id);
  res.status(200).send(customer);
}

export async function updateCustomer(req, res) {
  await customerService.updateCustomer(req.params.id, req.body);
  res.status(200).send({ message: "Customer updated successfully" });
}

export async function deleteCustomer(req, res) {
  await customerService.deleteCustomer(req.params.id);
  res.status(200).send({ message: "Customer deleted successfully" });
}
