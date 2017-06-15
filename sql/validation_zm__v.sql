CREATE VIEW validation_zm__v AS
-- Zone Leaders:
--  Assertion 1: Must have Market Managers
--  Assertion 2: Should NOT be a market manager
--  Assertion 2: Must have Field Consultants assigned
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
    WHEN markets_assigned_validation.name IS NOT NULL THEN 'Y'
    ELSE 'N'
  END AS has_market_managers_assigned,
  CASE
    WHEN MIN(store.id) IS NOT NULL THEN 'Y'
    ELSE 'N'
  END AS has_field_consultants_assigned
FROM "user" as "user"
  INNER JOIN userrole AS role
    ON "user".userroleid = role.sfid
    AND role.name = 'Zone Management'
  LEFT OUTER JOIN sw_zone__c AS zone
    ON "user".sfid = zone.zone_leader__c
  LEFT OUTER JOIN sw_market__c as market_manager_validation
    ON "user".sfid = market_manager_validation.market_manager__c
  LEFT OUTER JOIN sw_market__c AS markets_assigned_validation
    ON zone.sfid = markets_assigned_validation.sw_zone__c
  LEFT OUTER JOIN fc_store__c AS store
    ON markets_assigned_validation.sfid = store.sw_market__c
GROUP BY
  "user".email,
  role.name,
  zone.name,
  market_manager_validation.name,
  markets_assigned_validation.name,
  "user".direct_dial_activated__c,
  "user".direct_dial_mobile_user__c;