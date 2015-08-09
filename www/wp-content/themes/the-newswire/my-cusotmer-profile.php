<?php
/**
 * Template Name: Profile
 * Description: Profile in full-width
 */
get_header(); ?>

<style>
	label {
    text-transform: capitalize!important;
		margin: 0px!important;
	}
	.mycred-my-balance-wrapper {
		font-size: 40px;
	}
</style>

    <div id="content" class="clearfix full-width-content">

        <div id="main" class="clearfix" role="main">

				<?php while ( have_posts() ) : the_post(); ?>

				<?php get_template_part( 'content', 'page' ); ?>

				<?php comments_template( '', true ); ?>

				<?php endwhile; // end of the loop. ?>

			</div>
		</div>

<?php get_footer(); ?>

