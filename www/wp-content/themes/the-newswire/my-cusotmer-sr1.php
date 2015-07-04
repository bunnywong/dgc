<?php
/**
 * Template Name: My Customer Search 1 (SR1)
 * Description: Custom Search list view in full-width
 */
get_header(); ?>
<style>
	.form-group, button {
		margin-top: 20px;
	}
	label {
		width: 100px;
		display: inline-block;
	}
	input {
		height: 50px;
		width: 300px;
	}
	button {
		width: 405px;
		height: 50px;
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