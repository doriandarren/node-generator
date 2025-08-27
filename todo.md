## Ruta Mile no borrar

C:\Users\miled\Desktop\WorkSpaceNode\PROYECTOS\app1
splytin_api



# TODOLIST Tareas Pendientes NODE:


- REACT tema de "perfil" hacer que funcione.
- PHP generar / virificar de crear un email de prueba. Mail/TestMail y en la vista: test/email_test.blade.php


- Cron y tareas programadas
- Terminar con la llamada a callGenerate





## Notes

```sh

SingularName 
PlurarName

singular-name-kebab
plural-name-kebab

singular_name_snake
plural_name_snake

singularNameCase
pluralNameCase


```




Table: customer_prices - CustomerPrice - CustomerPrices
Columns: customer_id product_id amount_without_vat 
 
📄 Table: product_extras - ProductExtra - ProductExtras
Columns: name duration amount_without_vat vat_type 
 
📄 Table: product_fixed_extras - ProductFixedExtra - ProductFixedExtras
Columns: name amount_without_vat vat_type 
 
📄 Table: operators - Operator - Operators
Columns: name 
 
📄 Table: products - Product - Products
Columns: name duration amount_without_vat vat_type 
 
📄 Table: customer_vehicles - CustomerVehicle - CustomerVehicles
Columns: customer_id plate is_authorized 
 
📄 Table: washes - Wash - Washes
Columns: operator_id payment_mode_id status_id customer_id wash_counter trx_date customer_code company_name plate trailer_plate driver driver_doc init_time finish_time price special_price courtesy extras comments invoiced in_job 
 
📄 Table: payment_modes - PaymentMode - PaymentModes
Columns: name 
 
📄 Table: wash_products - WashProduct - WashProducts
Columns: wash_id product_id amount_without_vat special_amount_without_vat 
 
📄 Table: wash_product_extras - WashProductExtra - WashProductExtras
Columns: wash_id product_extra_id amount_without_vat special_amount_without_vat 
 
📄 Table: wash_product_fixed_extras - WashProductFixedExtra - WashProductFixedExtras
Columns: wash_id product_fixed_extra_id amount_without_vat special_amount_without_vat 
 
📄 Table: companies - Company - Companies
Columns: country_id name tax address zip_code state municipality email phone website 
 
📄 Table: customers - Customer - Customers
Columns: customer_status_id:integer company_id:fk service_id:fk app_customer_id code:string is_update_app:boolean 
 
📄 Table: customer_invoices - CustomerInvoice - CustomerInvoices
Columns: customer_id remittance_type_id bank_name bank_account account_holder due_date due_date_by_days vat_type is_exempt 
 
📄 Table: remittance_types - RemittanceType - RemittanceTypes
Columns: name 
 
📄 Table: countries - Country - Countries
Columns: common_name iso_name code_alpha_2 code_alpha_3 numerical_code 
 
📄 Table: services - Service - Services
Columns: name 
 
📄 Table: invoice_headers - InvoiceHeader - InvoiceHeaders
Columns: invoice_counter_id payment_mode_id customer_id invoice_origin_id remittance_type_id country_id serie invoice_string invoice_nb invoice_date invoice_due_date month year municipality state zip_code address tax name description vat_type vat_quote base_without_vat total_without_vat total_with_vat has_paid has_sent 
 
📄 Table: invoice_counters - InvoiceCounter - InvoiceCounters
Columns: year serial counter 
 
📄 Table: invoice_origins - InvoiceOrigin - InvoiceOrigins
Columns: name 
 
📄 Table: invoice_washes - InvoiceWash - InvoiceWashes
Columns: wash_id invoice_header_id amount_without_vat 
 
📄 Table: invoice_line_products - InvoiceLineProduct - InvoiceLineProducts
Columns: invoice_wash_id product_id amount_without_vat special_amount_without_vat 
 
📄 Table: invoice_line_extras - InvoiceLineExtra - InvoiceLineExtras
Columns: invoice_wash_id product_extra_id amount_without_vat special_amount_without_vat 
 
📄 Table: invoice_line_fixed_extras - InvoiceLineFixedExtra - InvoiceLineFixedExtras
Columns: invoice_wash_id product_fixed_extra_id amount_without_vat special_amount_without_vat 
 
📄 Table: wash_statuses - WashStatus - WashStatuses
Columns: name 
 
📄 Table: wash_counters - WashCounter - WashCounters
Columns: counter 
 
📄 Table: customer_risks - CustomerRisk - CustomerRisks
Columns: customer_id service_id app_customer_id risk_id movement_date movement_type_id movement_type in out balance description 
 
📄 Table: customer_invoice_emails - CustomerInvoiceEmail - CustomerInvoiceEmails
Columns: customer_invoice_id email 
 
📄 Table: invoice_settings - InvoiceSetting - InvoiceSettings
Columns: is_blocked 
 
📄 Table: endpoint_settings - EndpointSetting - EndpointSettings
Columns: origin token 
 
📄 Table: customer_statuses - CustomerStatus - CustomerStatuses
Columns: name 
 
📄 Table: customer_block_plates - CustomerBlockPlate - CustomerBlockPlates
Columns: customer_id 
 
📄 Table: customer_credits - CustomerCredit - CustomerCredits
Columns: customer_id credit_status_id obtain_method_id risk_company_id contract_company_id debtor_code amount_obtained amount_obtained_date amount_granted amount_granted_date amount_used amount_available 
 
📄 Table: customer_prepaids - CustomerPrepaid - CustomerPrepaids
Columns: customer_id prepaid_status_id amount_available 
 
📄 Table: credit_obtain_methods - CreditObtainMethod - CreditObtainMethods
Columns: name 
 
📄 Table: credit_risk_companies - CreditRiskCompany - CreditRiskCompanies
Columns: name address phone 
 
📄 Table: credit_contract_companies - CreditContractCompany - CreditContractCompanies
Columns: name address phone 
 
📄 Table: movement_credits - MovementCredit - MovementCredits
Columns: user_id customer_credit_id movement_type_id movement_date balance amount_out amount_in description 
 
📄 Table: movement_prepaids - MovementPrepaid - MovementPrepaids
Columns: user_id customer_prepaid_id movement_type_id movement_date amount_in amount_out balance description 
 
📄 Table: movement_prepaid_types - MovementPrepaidType - MovementPrepaidTypes
Columns: name 
 
📄 Table: credit_provisionals - CreditProvisional - CreditProvisionals
Columns: customer_credit_id balance_authorizer_id provisional_status_id initial_balance balance due_date 
 
📄 Table: balance_authorizers - BalanceAuthorizer - BalanceAuthorizers
Columns: name 
 
📄 Table: prepaid_provisionals - PrepaidProvisional - PrepaidProvisionals
Columns: customer_prepaid_id balance_authorizer_id provisional_status_id initial_balance balance due_date 
 
📄 Table: provisional_statuses - ProvisionalStatus - ProvisionalStatuses
Columns: name 
 
📄 Table: customer_credit_statuses - CustomerCreditStatus - CustomerCreditStatuses
Columns: name 
 
📄 Table: customer_prepaid_statuses - CustomerPrepaidStatus - CustomerPrepaidStatuses
Columns: name 
 
📄 Table: daily_wash_summaries - DailyWashSummary - DailyWashSummaries
Columns: summary_date washes_count washes_price_estimated cash_washes_count card_washes_count credit_washes_count prepaid_washes_count 
 
📄 Table: movement_credit_types - MovementCreditType - MovementCreditTypes
Columns: name 
 