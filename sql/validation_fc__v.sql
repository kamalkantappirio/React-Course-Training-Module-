CREATE VIEW validation_fc__v AS
-- Field Consultants:
--  Assertion 1: Must have Stores
--  Assertion 2: Should NOT be a market manager
--  Assertion 3: Should NOT be zone management
--  Assertion 4: Must have stores assigned
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
    WHEN market_manager_validation.name IS NULL THEN 'Y'
    ELSE 'N'
  END AS is_not_a_marketing_manager,
  CASE
    WHEN zone.name IS NULL THEN 'Y'
    ELSE 'N'
  END AS is_not_zone_management,
  CASE
    WHEN MIN(store.id) IS NOT NULL THEN 'Y'
    ELSE 'N'
  END AS has_stores_assigned
FROM "user" as "user"
  INNER JOIN userrole AS role
    ON "user".userroleid = role.sfid
    AND role.name = 'Field Consultant'
  LEFT OUTER JOIN fc_store__c AS store
    ON "user".email = store.fc_email__c
  LEFT OUTER JOIN sw_market__c as market_manager_validation
    ON "user".sfid = market_manager_validation.market_manager__c
  LEFT OUTER JOIN sw_zone__c AS zone
    ON "user".sfid = zone.zone_leader__c

GROUP BY
  "user".email,
  role.name,
  zone.name,
  market_manager_validation.name,
  "user".direct_dial_activated__c,
  "user".direct_dial_mobile_user__c;