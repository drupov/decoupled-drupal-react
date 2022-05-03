<?php

namespace Drupal\players\Plugin\GraphQL\PersistedQuery;

use Drupal\graphql\PersistedQuery\PersistedQueryPluginBase;
use GraphQL\Server\OperationParams;

/**
 * @PersistedQuery(
 *   id = "persisted_query_create_player",
 *   label = "Persisted Query Create Player",
 *   description = "Persisted query plugin for create player mutation"
 * )
 *
 * Class PersistedQueryCreatePlayer
 * @package Drupal\players\Plugin\GraphQL\PersistedQuery
 */
class PersistedQueryCreatePlayer extends PersistedQueryPluginBase {

  /**
   * {@inheritdoc}
   */
  public function getQuery($id, OperationParams $operation) {
    $queryMap = $this->queryMap();
    return $queryMap[$id] ?? NULL;
  }

  /**
   * Map between persisted query IDs and corresponding GraphQL queries.
   */
  protected function queryMap() {
    return [
      '5a415b50ee35ed6168a06330a1dceb635d55b3453aad77c8b8b54c645070f8d3' => 'mutation CreatePlayer ($firstName: String!, $lastName: String!) { createPlayer (data: {firstName: $firstName, lastName: $lastName}) { id } }',
    ];
  }

}
