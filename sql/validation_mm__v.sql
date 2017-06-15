CREATE VIEW validation_mm__v AS
-- Market Managers:
--  Assertion 1: Must have Field Consultants
--  Assertion 2: Must NOT be zone management
--  Assertion 3: Must have stores assigned
--  Assertion 4: Must have Field Consultants in stores
SELECT DISTINCT
  "user".email,
  role.name,
  CASE
    WHEN "user".direct_dial_activated__c THEN 'Y'
    ELSE 'N'
  END AS direct_dial_activated,
  CASE
    WHEN "user".direct_dial_mobile_user__c THEN 'Y'
    ELSE 'N'
  END AS direct_dial_mobile_user,
  CASE
    WHEN zone.name IS NULL THEN 'Y'
    ELSE 'N'
  END AS is_not_a_zone_leader,
  CASE
    WHEN market.name IS NOT NULL THEN 'Y'
    ELSE 'N'
  END AS has_markets_assigned,
  CASE
    WHEN MIN(store.id) IS NOT NULL THEN 'Y'
    ELSE 'N'
  END AS has_stores_assigned,
  CASE
    WHEN MIN(field_consultant_validation.email) IS NOT NULL THEN 'Y'
    ELSE 'N'
  END AS has_field_consultants_assigned
FROM "user" as "user"
  INNER JOIN userrole AS role
    ON "user".userroleid = role.sfid
       AND role.name = 'Market Management'
  LEFT OUTER JOIN sw_zone__c AS zone
    ON "user".sfid = zone.zone_leader__c
  LEFT OUTER JOIN sw_market__c as market
    ON "user".sfid = market.market_manager__c
  LEFT OUTER JOIN fc_store__c AS store
    ON market.sfid = store.sw_market__c
  LEFT OUTER JOIN "user" AS field_consultant_validation
    ON store.fc_email__c = field_consultant_validation.email
GROUP BY
  "user".email,
  role.name,
  zone.name,
  market.name,
  store.fc_email__c,
  field_consultant_validation.email,
  "user".direct_dial_activated__c,
  "user".direct_dial_mobile_user__c;